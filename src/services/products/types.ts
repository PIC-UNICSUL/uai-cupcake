type AvailabilityStatus = 'AVAILABLE' | 'UNAVAILABLE';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  photos: any;
  availabilityStatus: AvailabilityStatus;
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
  availabilityStatus: AvailabilityStatus;
}

interface ParamsGetProducts {
  category?: string;
  order?: 'asc' | 'desc';
  limit?: number;
}
