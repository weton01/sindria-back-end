export const floatTransformer = {
  to(value) {
    return value;
  },
  from(value) {
    return parseFloat(value);
  },
}