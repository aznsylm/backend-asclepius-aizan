const { storeData, getAllData } = require("../services/storeData");
const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictClassification(
    model,
    image
  );
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });

  response.code(201);
  return response;
}

async function getPredictHandler(request, h) {
  const data = await getAllData();

  const response = h.response({
    status: "success",
    data,
  });

  response.code(200);
  return response;
}

module.exports = { postPredictHandler, getPredictHandler };
