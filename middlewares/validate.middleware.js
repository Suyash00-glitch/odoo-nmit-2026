export const validate =
  (schema, target = 'body') =>
  (req, res, next) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: errors.map((e) => `${e.field}: ${e.message}`).join('; '),
          details: errors,
        },
      });
      return;
    }
    req[target] = result.data;
    next();
  };
