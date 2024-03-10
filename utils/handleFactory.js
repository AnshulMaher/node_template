const catchAsync = require('./catchAsync');
const AppError = require('./appError');
const APIFeatures = require('./apiFeatures');

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const modelName = Model.collection.collectionName;
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const documents = await features.query;

    res.status(200).json({
      status: 'success',
      results: documents.length,
      data: {
        [modelName]: documents,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    let modelName = Model.collection.collectionName;
    modelName = modelName.substring(0, modelName.length - 1);
    const data = { ...req.body };
    const document = await Model.create(data);
    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: document,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let modelName = Model.collection.collectionName;
    modelName = modelName.substring(0, modelName.length - 1);
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const document = await query;
    if (!document) {
      return next(new AppError(404, 'No document found with that ID'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        // data: document
        [modelName]: document,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let modelName = Model.collection.collectionName;
    modelName = modelName.substring(0, modelName.length - 1);
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new AppError(404, 'No document found with that ID'));
    }
    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: document,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError(404, 'No document found with that ID'));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
