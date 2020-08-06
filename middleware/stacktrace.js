exports.stacktrace = async (err, req, res, next) => {
  const body = {
    message: err.message,
  };
  // For development environment is important to print the stack trace when something is broken
  // For staging or production environment must not be printing the stacktrace when something is broken
  // In order to follow the error stacktrace, it's important to use another service like Datadog to handle
  // error logs with the stacktrace.
  if (process.env.NODE_ENV === "development") {
    body.error = err.stack;
  }
  res.status(err.status || 500).json(body);
};
