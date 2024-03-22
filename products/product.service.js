const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
    return await db.Product.create(params);
}

async function update(id, params) {
    const product = await getProduct(id);
    return await product.update(params);
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

// Helper function
async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}