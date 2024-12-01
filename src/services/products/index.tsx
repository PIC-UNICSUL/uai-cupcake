import api from '../api';

const RESOURSE = '/product';
const ADMIN_RESOURSE = '/admin/product';

const ProductService = {
  getProducts: async (filters?: ParamsGetProducts): Promise<Product[]> => {
    const response = await api.get(RESOURSE, { params: filters });
    return response.data;
  },
  createProduct: async (payload: CreateProductReq): Promise<Product> => {
    const response = await api.post(ADMIN_RESOURSE, payload);
    return response.data;
  },
  updateProduct: async (payload: Product): Promise<Product> => {
    const response = await api.put(ADMIN_RESOURSE, payload);
    return response.data;
  },
  updateProductAvailability: async (
    payload: UpdateProductAvailabilityReq,
  ): Promise<Product> => {
    const response = await api.put(`${ADMIN_RESOURSE}/availability}`, payload);
    return response.data;
  },
};

export { ProductService };
