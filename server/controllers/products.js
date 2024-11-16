const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.create = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    // console.log(title, description, price, quantity, categoryId, images);
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });

    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "server error" });
  }
};
exports.list = async (req, res) => {
  try {
    const { count } = req.params;
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "server error" });
  }
};
exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "server error" });
  }
};
exports.update = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;

    //clear images in DB
    await prisma.image.deleteMany({
      where: {
        productId: Number(req.params.id),
      },
    });

    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: " server error" });
  }
};
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    // step remove in cloud
    // search images
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: { images: true },
    });
    if (!product) {
      return res.status(400).json({ message: "Product not found!!" });
    }
    console.log(product);

    // promise del in cloud
    const deletedImage = product.images.map(
      (image) =>
        new Promise((resolve, reject) => {
          // remove in cloud
          cloudinary.uploader.destroy(image.public_id, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        })
    );
    await Promise.all(deletedImage);

    // remove in DB
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Deleted Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "server error" });
  }
};
exports.listby = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: {
        category: true,
        images: true,
      },
    });
    console.log(products);
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "server error" });
  }
};

const handleQuery = async (req, res, query) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};

const handlePrice = async (req, res, priceRange) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};

const handleCategory = async (req, res, categoryId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "Search Error" });
  }
};

exports.searchFilters = async (req, res) => {
  try {
    const { query, category, price } = req.body;
    if (query) {
      console.log("query = ", query);
      await handleQuery(req, res, query);
    }
    if (category) {
      console.log("category = ", category);
      await handleCategory(req, res, category);
    }
    if (price) {
      console.log("price = ", price);
      await handlePrice(req, res, price);
    }
    // res.send("Hello searchFilters Product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "server error" });
  }
};

exports.createImages = async (req, res) => {
  try {
    console.log(req.body);
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `V-${Date.now()}`,
      resource_type: `auto`,
      folder: `Ecom2024`,
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.removeImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    cloudinary.uploader.destroy(public_id, (result) => {
      res.send("Remove Image Success!!");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.bannerData = (req, res) => {
  try {
    const banner = [
      "https://img2.pic.in.th/pic/Computer-Cover---PosterMyWall.jpg",
      "https://img5.pic.in.th/file/secure-sv1/Gaming-PC-Cover---PosterMyWall.jpg",
      "https://img5.pic.in.th/file/secure-sv1/Computer-Sale-Cover-Template---PosterMyWall.jpg",
      "https://img2.pic.in.th/pic/Computer-Parts-Banner---PosterMyWall.jpg",
      "https://img5.pic.in.th/file/secure-sv1/gaming-computer-banner-sale-design-template-4eee9f783ef62e0f7122e9ae7828bec1_screen.jpg",
    ];

    res.send(banner)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " server error " });
  }
};
