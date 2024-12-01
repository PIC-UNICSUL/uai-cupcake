interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  photos: any;
  availabilityStatus: string;
}

interface CreateProductReq {
  name: string;
  description: string;
  category: string;
  price: number;
  photos: any;
}

interface UpdateProductAvailabilityReq {
  id: string;
  availabilityStatus: string;
}

interface ParamsGetProducts {
  category?: string;
  order?: 'asc' | 'desc';
  limit?: number;
}
