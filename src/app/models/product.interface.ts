import { IList } from './index';

interface IProductReview {
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
  date: string;
}

interface IProductDimension {
  width: number;
  height: number;
  depth: number;
}

interface IProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface IProductList extends IList {
  products: IProduct[];
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[],
  brand: string;
  sku: string;
  weight: number;
  dimensions: IProductDimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IProductMeta;
  thumbnail: string;
  images: string[];
}