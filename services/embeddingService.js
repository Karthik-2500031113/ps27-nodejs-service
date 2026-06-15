const { pipeline } =
require('@xenova/transformers');

let extractor;

async function loadModel() {

    extractor = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2'
    );

    console.log("Embedding model loaded");
}

async function generateEmbedding(text) {

    if (!extractor) {
        await loadModel();
    }

    const output = await extractor(text, {
        pooling: 'mean',
        normalize: true
    });

    return Array.from(output.data);
}

module.exports = {
    generateEmbedding
};