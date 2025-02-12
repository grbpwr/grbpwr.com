import {
  common_GenderEnum,
  common_OrderFactor,
  common_SortFactor,
  GetProductsPagedRequest,
} from "@/api/proto-http/frontend";

export function getProductsPagedQueryParams({
  sort,
  order,
  category,
  gender,
  size,
  sale,
  tag,
}: {
  sort?: string | null;
  order?: string | null;
  category?: string | null;
  gender?: string | null;
  size?: string | null;
  sale?: string | null;
  tag?: string | null;
}): Pick<
  GetProductsPagedRequest,
  "sortFactors" | "orderFactor" | "filterConditions"
> {
  // todo: validate params before make a request
  return {
    sortFactors: sort ? [sort as common_SortFactor] : undefined,
    orderFactor: order ? (order as common_OrderFactor) : undefined,
    filterConditions: {
      topCategoryIds: category ? [parseInt(category)] : undefined,
      subCategoryIds: undefined,
      typeIds: undefined,
      //   genderIds: gender ? [parseInt(gender)] : undefined,
      sizesIds: size ? [parseInt(size)] : undefined,
      from: undefined,
      to: undefined,
      onSale: sale ? sale === "true" : undefined,
      color: undefined,
      preorder: undefined,
      byTag: tag ? tag : undefined,
      gender: gender ? [gender as common_GenderEnum] : undefined,
    },
  };
}
