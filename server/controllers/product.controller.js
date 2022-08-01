const data = [
    {
        "id": 100,
        "name": "Product 1",
        "price": 100,
        "stock": 1000,
        "picture": "https://img.freepik.com/free-photo/living-room-interior-wall-mockup-warm-tones-with-pink-armchair-minimal-design-3d-rendering_41470-4171.jpg"
    },
    {
        "id": 200,
        "name": "Product 2",
        "price": 200,
        "stock": 2000,
        "picture": "https://img.freepik.com/free-photo/white-box_74190-267.jpg"
    },
    {
        "id": 300,
        "name": "Product 3",
        "price": 300,
        "stock": 3000,
        "picture": "https://img.freepik.com/free-photo/mockup-white-wall-loft-style-house-with-sofa-accessories-room-3d-rendering_41470-3836.jpg"
    },
    {
        "id": 301,
        "name": "Piplup Sitting Cuties Plush - 4 ¾ In.",
        "price": 153,
        "stock": 99999,
        "picture": "https://www.pokemoncenter.com/products/images/P8020/701-29490/P8020_701-29490_01_thumb.jpg"
    },
    {
        "id": 302,
        "name": "Slowpoke Large Microbead Plush - 13 ¾ In.",
        "price": 158,
        "stock": 99999,
        "picture": "https://www.pokemoncenter.com/products/images/P7730/701-29236/P7730_701-29236_01_thumb.jpg"
    },
    {
        "id": 304,
        "name": "Glaceon Sitting Cuties Plush - 7 In.",
        "price": 150,
        "stock": 9999,
        "picture": "https://www.pokemoncenter.com/products/images/P8023/701-29644/P8023_701-29644_01_thumb.jpg"
    },
    {
        "id": 305,
        "name": "Relaxing Pikachu Plush - 12 ¼ In.",
        "price": 150,
        "stock": 9999,
        "picture": "https://www.pokemoncenter.com/products/images/P6588/701-06704/P6588_701-06704_01_thumb.jpg"
    }
]

export default async function productController(req, res) {
    res.status(200).json(data);
}