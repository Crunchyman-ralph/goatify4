import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type CalculatorField = {
  __typename?: 'CalculatorField';
  canBeDeleted?: Maybe<Scalars['Boolean']>;
  currency?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  groupDetail?: Maybe<Scalars['String']>;
  groupOrder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  label: Scalars['String'];
  name: Scalars['String'];
  operation: Scalars['String'];
  order: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['Float'];
};

export type CalculatorFieldCreateInput = {
  canBeDeleted?: InputMaybe<Scalars['Boolean']>;
  currency?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
  groupDetail?: InputMaybe<Scalars['String']>;
  groupOrder?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  label: Scalars['String'];
  name: Scalars['String'];
  operation: Scalars['String'];
  order: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['Float'];
};

export type CalculatorFieldUpdateInput = {
  canBeDeleted?: InputMaybe<Scalars['Boolean']>;
  currency?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
  groupDetail?: InputMaybe<Scalars['String']>;
  groupOrder?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  operation?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type CalculatorFieldsResponse = {
  __typename?: 'CalculatorFieldsResponse';
  nodes?: Maybe<Array<CalculatorField>>;
};

export type CategoriesResponse = {
  __typename?: 'CategoriesResponse';
  nodes?: Maybe<Array<Category>>;
  total?: Maybe<Scalars['Int']>;
};

export type Category = {
  __typename?: 'Category';
  id_: Scalars['String'];
  name: Scalars['String'];
};

export type CategoryCreateInput = {
  name: Scalars['String'];
};

export type ErrorPosition = {
  __typename?: 'ErrorPosition';
  character: Scalars['Int'];
  line: Scalars['Int'];
};

export type ImageInput = {
  __typename?: 'ImageInput';
  altText?: Maybe<Scalars['String']>;
  id_?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
};

export type ImageInputCreateInput = {
  altText?: InputMaybe<Scalars['String']>;
  src?: InputMaybe<Scalars['String']>;
};

export type ImageInputUpdateInput = {
  altText?: InputMaybe<Scalars['String']>;
  src?: InputMaybe<Scalars['String']>;
};

export type InventoryItemInput = {
  __typename?: 'InventoryItemInput';
  cost?: Maybe<Scalars['Float']>;
  id_?: Maybe<Scalars['String']>;
  tracked?: Maybe<Scalars['Boolean']>;
};

export type InventoryItemInputCreateInput = {
  cost?: InputMaybe<Scalars['Float']>;
  tracked?: InputMaybe<Scalars['Boolean']>;
};

export type InventoryItemInputUpdateInput = {
  cost?: InputMaybe<Scalars['Float']>;
  tracked?: InputMaybe<Scalars['Boolean']>;
};

export type InventoryLevelInput = {
  __typename?: 'InventoryLevelInput';
  availableQuantity: Scalars['Int'];
  id_?: Maybe<Scalars['String']>;
  locationId: Scalars['String'];
};

export type InventoryLevelInputCreateInput = {
  availableQuantity: Scalars['Int'];
  locationId: Scalars['String'];
};

export type InventoryLevelInputUpdateInput = {
  availableQuantity: Scalars['Int'];
  locationId: Scalars['String'];
};

export type Login = {
  __typename?: 'Login';
  name: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addSubProduct?: Maybe<ProductInput>;
  calculatorFieldsUpdateOrCreate?: Maybe<CalculatorFieldsResponse>;
  categoryCreate?: Maybe<Category>;
  categoryDelete?: Maybe<Category>;
  createSubProduct?: Maybe<ProductInput>;
  injectProductInShopify?: Maybe<Scalars['JSON']>;
  login?: Maybe<Login>;
  productInputCreate?: Maybe<ProductInput>;
  productInputDelete?: Maybe<ProductInput>;
  productInputUpdate?: Maybe<ProductInput>;
  removeSubProduct?: Maybe<ProductInput>;
  shopCreate?: Maybe<Shop>;
  shopDelete?: Maybe<Shop>;
  shopUpdate?: Maybe<Shop>;
};


export type MutationAddSubProductArgs = {
  productInputId: Scalars['String'];
  subProductId: Scalars['String'];
};


export type MutationCalculatorFieldsUpdateOrCreateArgs = {
  data: Array<CalculatorFieldCreateInput>;
  productInputId: Scalars['String'];
};


export type MutationCategoryCreateArgs = {
  data: CategoryCreateInput;
};


export type MutationCategoryDeleteArgs = {
  id: Scalars['String'];
};


export type MutationCreateSubProductArgs = {
  productInputId: Scalars['String'];
};


export type MutationInjectProductInShopifyArgs = {
  productInputId: Scalars['String'];
  shopId: Scalars['String'];
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationProductInputCreateArgs = {
  data: ProductInputCreateInput;
};


export type MutationProductInputDeleteArgs = {
  id: Scalars['String'];
};


export type MutationProductInputUpdateArgs = {
  data: ProductInputUpdateInput;
};


export type MutationRemoveSubProductArgs = {
  productInputId: Scalars['String'];
  subProductId: Scalars['String'];
};


export type MutationShopCreateArgs = {
  data: ShopCreateInput;
};


export type MutationShopDeleteArgs = {
  id: Scalars['String'];
};


export type MutationShopUpdateArgs = {
  data: ShopUpdateInput;
};

export type ParseErrorRange = {
  __typename?: 'ParseErrorRange';
  end: ErrorPosition;
  start: ErrorPosition;
};

export type ParseErrors = {
  __typename?: 'ParseErrors';
  code: Scalars['String'];
  message: Scalars['String'];
  range: ParseErrorRange;
};

export type ProductInput = {
  __typename?: 'ProductInput';
  adCopies?: Maybe<Array<Scalars['String']>>;
  calculatorFields?: Maybe<Array<CalculatorField>>;
  categories?: Maybe<Array<Category>>;
  competitorUrls?: Maybe<Array<Scalars['String']>>;
  creativeUrls?: Maybe<Array<Scalars['String']>>;
  customProductType?: Maybe<Scalars['String']>;
  descriptionHtml?: Maybe<Scalars['String']>;
  giftCard?: Maybe<Scalars['Boolean']>;
  handle?: Maybe<Scalars['String']>;
  id_?: Maybe<Scalars['String']>;
  images?: Maybe<Array<ImageInput>>;
  options?: Maybe<Array<Maybe<Scalars['String']>>>;
  productType?: Maybe<Scalars['String']>;
  requiresSellingPlan?: Maybe<Scalars['Boolean']>;
  seo?: Maybe<SeoInput>;
  standardizedProductType?: Maybe<StandardizedProductTypeInput>;
  status?: Maybe<Status>;
  subProducts?: Maybe<Array<ProductInput>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  templateSuffix?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  variants?: Maybe<Array<ProductVariantInput>>;
  vendor?: Maybe<Scalars['String']>;
};

export type ProductInputCreateInput = {
  adCopies?: InputMaybe<Array<Scalars['String']>>;
  calculatorFields?: InputMaybe<Array<CalculatorFieldCreateInput>>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  competitorUrls?: InputMaybe<Array<Scalars['String']>>;
  creativeUrls?: InputMaybe<Array<Scalars['String']>>;
  customProductType?: InputMaybe<Scalars['String']>;
  descriptionHtml?: InputMaybe<Scalars['String']>;
  giftCard?: InputMaybe<Scalars['Boolean']>;
  handle?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<ImageInputCreateInput>>;
  options?: InputMaybe<Array<Scalars['String']>>;
  productInputId?: InputMaybe<Scalars['String']>;
  productType?: InputMaybe<Scalars['String']>;
  requiresSellingPlan?: InputMaybe<Scalars['Boolean']>;
  seo?: InputMaybe<SeoInputCreateInput>;
  standardizedProductType?: InputMaybe<StandardizedProductTypeInputCreateInput>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templateSuffix?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  variants?: InputMaybe<Array<ProductVariantInputCreateInput>>;
  vendor?: InputMaybe<Scalars['String']>;
};

export type ProductInputUpdateInput = {
  adCopies?: InputMaybe<Array<Scalars['String']>>;
  calculatorFields?: InputMaybe<Array<CalculatorFieldUpdateInput>>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  competitorUrls?: InputMaybe<Array<Scalars['String']>>;
  creativeUrls?: InputMaybe<Array<Scalars['String']>>;
  customProductType?: InputMaybe<Scalars['String']>;
  descriptionHtml?: InputMaybe<Scalars['String']>;
  giftCard?: InputMaybe<Scalars['Boolean']>;
  handle?: InputMaybe<Scalars['String']>;
  id_: Scalars['String'];
  images?: InputMaybe<Array<ImageInputUpdateInput>>;
  options?: InputMaybe<Array<Scalars['String']>>;
  productType?: InputMaybe<Scalars['String']>;
  requiresSellingPlan?: InputMaybe<Scalars['Boolean']>;
  seo?: InputMaybe<SeoInputUpdateInput>;
  standardizedProductType?: InputMaybe<StandardizedProductTypeInputUpdateInput>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templateSuffix?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  variants?: InputMaybe<Array<ProductVariantInputUpdateInput>>;
  vendor?: InputMaybe<Scalars['String']>;
};

export type ProductInputsResponse = {
  __typename?: 'ProductInputsResponse';
  nodes?: Maybe<Array<ProductInput>>;
  total?: Maybe<Scalars['Int']>;
};

export type ProductVariantInput = {
  __typename?: 'ProductVariantInput';
  barcode?: Maybe<Scalars['String']>;
  compareAtPrice?: Maybe<Scalars['String']>;
  fulfillmentServiceId?: Maybe<Scalars['String']>;
  harmonizedSystemCode?: Maybe<Scalars['String']>;
  id_?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  imageSrc?: Maybe<Scalars['String']>;
  inventoryItem?: Maybe<InventoryItemInput>;
  inventoryManagement?: Maybe<ProductVariantInventoryManagement>;
  inventoryPolicy?: Maybe<ProductVariantInventoryPolicy>;
  inventoryQuantities?: Maybe<InventoryLevelInput>;
  mediaSrc?: Maybe<Array<Scalars['String']>>;
  options?: Maybe<Array<Scalars['String']>>;
  price?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  requiresShipping?: Maybe<Scalars['Boolean']>;
  sku?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  taxable?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  weightUnit?: Maybe<WeightUnit>;
};

export type ProductVariantInputCreateInput = {
  barcode?: InputMaybe<Scalars['String']>;
  compareAtPrice?: InputMaybe<Scalars['String']>;
  fulfillmentServiceId?: InputMaybe<Scalars['String']>;
  harmonizedSystemCode?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  imageSrc?: InputMaybe<Scalars['String']>;
  inventoryItem?: InputMaybe<InventoryItemInputCreateInput>;
  inventoryManagement?: InputMaybe<ProductVariantInventoryManagement>;
  inventoryPolicy?: InputMaybe<ProductVariantInventoryPolicy>;
  inventoryQuantities?: InputMaybe<InventoryLevelInputCreateInput>;
  mediaSrc?: InputMaybe<Array<Scalars['String']>>;
  options?: InputMaybe<Array<Scalars['String']>>;
  price?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  requiresShipping?: InputMaybe<Scalars['Boolean']>;
  sku?: InputMaybe<Scalars['String']>;
  taxCode?: InputMaybe<Scalars['String']>;
  taxable?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
  weightUnit?: InputMaybe<WeightUnit>;
};

export type ProductVariantInputUpdateInput = {
  barcode?: InputMaybe<Scalars['String']>;
  compareAtPrice?: InputMaybe<Scalars['String']>;
  fulfillmentServiceId?: InputMaybe<Scalars['String']>;
  harmonizedSystemCode?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  imageSrc?: InputMaybe<Scalars['String']>;
  inventoryItem?: InputMaybe<InventoryItemInputUpdateInput>;
  inventoryManagement?: InputMaybe<ProductVariantInventoryManagement>;
  inventoryPolicy?: InputMaybe<ProductVariantInventoryPolicy>;
  inventoryQuantities?: InputMaybe<InventoryLevelInputUpdateInput>;
  mediaSrc?: InputMaybe<Array<Scalars['String']>>;
  options?: InputMaybe<Array<Scalars['String']>>;
  price?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  requiresShipping?: InputMaybe<Scalars['Boolean']>;
  sku?: InputMaybe<Scalars['String']>;
  taxCode?: InputMaybe<Scalars['String']>;
  taxable?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
  weightUnit?: InputMaybe<WeightUnit>;
};

export enum ProductVariantInventoryManagement {
  FulfillmentService = 'FULFILLMENT_SERVICE',
  NotManaged = 'NOT_MANAGED',
  Shopify = 'SHOPIFY'
}

export enum ProductVariantInventoryPolicy {
  Continue = 'CONTINUE',
  Deny = 'DENY'
}

export type Query = {
  __typename?: 'Query';
  calculatorFields: CalculatorFieldsResponse;
  categories: CategoriesResponse;
  category?: Maybe<Category>;
  productInput?: Maybe<ProductInput>;
  productInputs: ProductInputsResponse;
  shop?: Maybe<Shop>;
  shopifyqlResponse?: Maybe<ShopifyqlResponse>;
  shops: ShopsResponse;
  subProducts: SubProductsResponse;
};


export type QueryCalculatorFieldsArgs = {
  productInputId?: InputMaybe<Scalars['String']>;
};


export type QueryCategoriesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryProductInputArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryProductInputsArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
  includeSubProducts?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryShopArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryShopifyqlResponseArgs = {
  query: Scalars['String'];
  shopId: Scalars['String'];
};


export type QueryShopsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QuerySubProductsArgs = {
  productInputId: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type SeoInput = {
  __typename?: 'SEOInput';
  description?: Maybe<Scalars['String']>;
  id_?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SeoInputCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SeoInputUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Shop = {
  __typename?: 'Shop';
  accessToken: Scalars['String'];
  id_: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ShopCreateInput = {
  accessToken: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ShopUpdateInput = {
  accessToken?: InputMaybe<Scalars['String']>;
  id_: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ShopifyqlResponse = {
  __typename?: 'ShopifyqlResponse';
  parseErrors?: Maybe<Array<Maybe<ParseErrors>>>;
  tableData?: Maybe<TableData>;
};

export type ShopsResponse = {
  __typename?: 'ShopsResponse';
  nodes?: Maybe<Array<Shop>>;
  total?: Maybe<Scalars['Int']>;
};

export type StandardizedProductTypeInput = {
  __typename?: 'StandardizedProductTypeInput';
  id_?: Maybe<Scalars['String']>;
  productTaxonomyNodeId?: Maybe<Scalars['String']>;
};

export type StandardizedProductTypeInputCreateInput = {
  productTaxonomyNodeId: Scalars['String'];
};

export type StandardizedProductTypeInputUpdateInput = {
  productTaxonomyNodeId: Scalars['String'];
};

export enum Status {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Draft = 'DRAFT'
}

export type SubProductsResponse = {
  __typename?: 'SubProductsResponse';
  nodes?: Maybe<Array<ProductInput>>;
  total?: Maybe<Scalars['Int']>;
};

export type TableData = {
  __typename?: 'TableData';
  columns?: Maybe<Array<TableDataColumn>>;
  rowData?: Maybe<Array<Array<Maybe<Scalars['String']>>>>;
};

export type TableDataColumn = {
  __typename?: 'TableDataColumn';
  dataType: Scalars['String'];
  displayName: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id_: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInput = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export enum WeightUnit {
  Grams = 'GRAMS',
  Kilograms = 'KILOGRAMS',
  Ounces = 'OUNCES',
  Pounds = 'POUNDS'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  CalculatorField: ResolverTypeWrapper<Partial<CalculatorField>>;
  CalculatorFieldCreateInput: ResolverTypeWrapper<Partial<CalculatorFieldCreateInput>>;
  CalculatorFieldUpdateInput: ResolverTypeWrapper<Partial<CalculatorFieldUpdateInput>>;
  CalculatorFieldsResponse: ResolverTypeWrapper<Partial<CalculatorFieldsResponse>>;
  CategoriesResponse: ResolverTypeWrapper<Partial<CategoriesResponse>>;
  Category: ResolverTypeWrapper<Partial<Category>>;
  CategoryCreateInput: ResolverTypeWrapper<Partial<CategoryCreateInput>>;
  DateTime: ResolverTypeWrapper<Partial<Scalars['DateTime']>>;
  ErrorPosition: ResolverTypeWrapper<Partial<ErrorPosition>>;
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>;
  ImageInput: ResolverTypeWrapper<Partial<ImageInput>>;
  ImageInputCreateInput: ResolverTypeWrapper<Partial<ImageInputCreateInput>>;
  ImageInputUpdateInput: ResolverTypeWrapper<Partial<ImageInputUpdateInput>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  InventoryItemInput: ResolverTypeWrapper<Partial<InventoryItemInput>>;
  InventoryItemInputCreateInput: ResolverTypeWrapper<Partial<InventoryItemInputCreateInput>>;
  InventoryItemInputUpdateInput: ResolverTypeWrapper<Partial<InventoryItemInputUpdateInput>>;
  InventoryLevelInput: ResolverTypeWrapper<Partial<InventoryLevelInput>>;
  InventoryLevelInputCreateInput: ResolverTypeWrapper<Partial<InventoryLevelInputCreateInput>>;
  InventoryLevelInputUpdateInput: ResolverTypeWrapper<Partial<InventoryLevelInputUpdateInput>>;
  JSON: ResolverTypeWrapper<Partial<Scalars['JSON']>>;
  Login: ResolverTypeWrapper<Partial<Login>>;
  Mutation: ResolverTypeWrapper<{}>;
  ParseErrorRange: ResolverTypeWrapper<Partial<ParseErrorRange>>;
  ParseErrors: ResolverTypeWrapper<Partial<ParseErrors>>;
  ProductInput: ResolverTypeWrapper<Partial<ProductInput>>;
  ProductInputCreateInput: ResolverTypeWrapper<Partial<ProductInputCreateInput>>;
  ProductInputUpdateInput: ResolverTypeWrapper<Partial<ProductInputUpdateInput>>;
  ProductInputsResponse: ResolverTypeWrapper<Partial<ProductInputsResponse>>;
  ProductVariantInput: ResolverTypeWrapper<Partial<ProductVariantInput>>;
  ProductVariantInputCreateInput: ResolverTypeWrapper<Partial<ProductVariantInputCreateInput>>;
  ProductVariantInputUpdateInput: ResolverTypeWrapper<Partial<ProductVariantInputUpdateInput>>;
  ProductVariantInventoryManagement: ResolverTypeWrapper<Partial<ProductVariantInventoryManagement>>;
  ProductVariantInventoryPolicy: ResolverTypeWrapper<Partial<ProductVariantInventoryPolicy>>;
  Query: ResolverTypeWrapper<{}>;
  SEOInput: ResolverTypeWrapper<Partial<SeoInput>>;
  SEOInputCreateInput: ResolverTypeWrapper<Partial<SeoInputCreateInput>>;
  SEOInputUpdateInput: ResolverTypeWrapper<Partial<SeoInputUpdateInput>>;
  Shop: ResolverTypeWrapper<Partial<Shop>>;
  ShopCreateInput: ResolverTypeWrapper<Partial<ShopCreateInput>>;
  ShopUpdateInput: ResolverTypeWrapper<Partial<ShopUpdateInput>>;
  ShopifyqlResponse: ResolverTypeWrapper<Partial<ShopifyqlResponse>>;
  ShopsResponse: ResolverTypeWrapper<Partial<ShopsResponse>>;
  StandardizedProductTypeInput: ResolverTypeWrapper<Partial<StandardizedProductTypeInput>>;
  StandardizedProductTypeInputCreateInput: ResolverTypeWrapper<Partial<StandardizedProductTypeInputCreateInput>>;
  StandardizedProductTypeInputUpdateInput: ResolverTypeWrapper<Partial<StandardizedProductTypeInputUpdateInput>>;
  Status: ResolverTypeWrapper<Partial<Status>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  SubProductsResponse: ResolverTypeWrapper<Partial<SubProductsResponse>>;
  TableData: ResolverTypeWrapper<Partial<TableData>>;
  TableDataColumn: ResolverTypeWrapper<Partial<TableDataColumn>>;
  User: ResolverTypeWrapper<Partial<User>>;
  UserLoginInput: ResolverTypeWrapper<Partial<UserLoginInput>>;
  WeightUnit: ResolverTypeWrapper<Partial<WeightUnit>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Partial<Scalars['Boolean']>;
  CalculatorField: Partial<CalculatorField>;
  CalculatorFieldCreateInput: Partial<CalculatorFieldCreateInput>;
  CalculatorFieldUpdateInput: Partial<CalculatorFieldUpdateInput>;
  CalculatorFieldsResponse: Partial<CalculatorFieldsResponse>;
  CategoriesResponse: Partial<CategoriesResponse>;
  Category: Partial<Category>;
  CategoryCreateInput: Partial<CategoryCreateInput>;
  DateTime: Partial<Scalars['DateTime']>;
  ErrorPosition: Partial<ErrorPosition>;
  Float: Partial<Scalars['Float']>;
  ImageInput: Partial<ImageInput>;
  ImageInputCreateInput: Partial<ImageInputCreateInput>;
  ImageInputUpdateInput: Partial<ImageInputUpdateInput>;
  Int: Partial<Scalars['Int']>;
  InventoryItemInput: Partial<InventoryItemInput>;
  InventoryItemInputCreateInput: Partial<InventoryItemInputCreateInput>;
  InventoryItemInputUpdateInput: Partial<InventoryItemInputUpdateInput>;
  InventoryLevelInput: Partial<InventoryLevelInput>;
  InventoryLevelInputCreateInput: Partial<InventoryLevelInputCreateInput>;
  InventoryLevelInputUpdateInput: Partial<InventoryLevelInputUpdateInput>;
  JSON: Partial<Scalars['JSON']>;
  Login: Partial<Login>;
  Mutation: {};
  ParseErrorRange: Partial<ParseErrorRange>;
  ParseErrors: Partial<ParseErrors>;
  ProductInput: Partial<ProductInput>;
  ProductInputCreateInput: Partial<ProductInputCreateInput>;
  ProductInputUpdateInput: Partial<ProductInputUpdateInput>;
  ProductInputsResponse: Partial<ProductInputsResponse>;
  ProductVariantInput: Partial<ProductVariantInput>;
  ProductVariantInputCreateInput: Partial<ProductVariantInputCreateInput>;
  ProductVariantInputUpdateInput: Partial<ProductVariantInputUpdateInput>;
  Query: {};
  SEOInput: Partial<SeoInput>;
  SEOInputCreateInput: Partial<SeoInputCreateInput>;
  SEOInputUpdateInput: Partial<SeoInputUpdateInput>;
  Shop: Partial<Shop>;
  ShopCreateInput: Partial<ShopCreateInput>;
  ShopUpdateInput: Partial<ShopUpdateInput>;
  ShopifyqlResponse: Partial<ShopifyqlResponse>;
  ShopsResponse: Partial<ShopsResponse>;
  StandardizedProductTypeInput: Partial<StandardizedProductTypeInput>;
  StandardizedProductTypeInputCreateInput: Partial<StandardizedProductTypeInputCreateInput>;
  StandardizedProductTypeInputUpdateInput: Partial<StandardizedProductTypeInputUpdateInput>;
  String: Partial<Scalars['String']>;
  SubProductsResponse: Partial<SubProductsResponse>;
  TableData: Partial<TableData>;
  TableDataColumn: Partial<TableDataColumn>;
  User: Partial<User>;
  UserLoginInput: Partial<UserLoginInput>;
}>;

export type CalculatorFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['CalculatorField'] = ResolversParentTypes['CalculatorField']> = ResolversObject<{
  canBeDeleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  group?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groupDetail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groupOrder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CalculatorFieldsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CalculatorFieldsResponse'] = ResolversParentTypes['CalculatorFieldsResponse']> = ResolversObject<{
  nodes?: Resolver<Maybe<Array<ResolversTypes['CalculatorField']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoriesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoriesResponse'] = ResolversParentTypes['CategoriesResponse']> = ResolversObject<{
  nodes?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ErrorPositionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorPosition'] = ResolversParentTypes['ErrorPosition']> = ResolversObject<{
  character?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  line?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageInput'] = ResolversParentTypes['ImageInput']> = ResolversObject<{
  altText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  src?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InventoryItemInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItemInput'] = ResolversParentTypes['InventoryItemInput']> = ResolversObject<{
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id_?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tracked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InventoryLevelInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryLevelInput'] = ResolversParentTypes['InventoryLevelInput']> = ResolversObject<{
  availableQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LoginResolvers<ContextType = any, ParentType extends ResolversParentTypes['Login'] = ResolversParentTypes['Login']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addSubProduct?: Resolver<Maybe<ResolversTypes['ProductInput']>, ParentType, ContextType, RequireFields<MutationAddSubProductArgs, 'productInputId' | 'subProductId'>>;
  calculatorFieldsUpdateOrCreate?: Resolver<Maybe<ResolversTypes['CalculatorFieldsResponse']>, ParentType, ContextType, RequireFields<MutationCalculatorFieldsUpdateOrCreateArgs, 'data' | 'productInputId'>>;
  categoryCreate?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationCategoryCreateArgs, 'data'>>;
  categoryDelete?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationCategoryDeleteArgs, 'id'>>;
  createSubProduct?: Resolver<Maybe<ResolversTypes['ProductInput']>, ParentType, ContextType, RequireFields<MutationCreateSubProductArgs, 'productInputId'>>;
  injectProductInShopify?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationInjectProductInShopifyArgs, 'productInputId' | 'shopId'>>;
  login?: Resolver<Maybe<ResolversTypes['Login']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'data'>>;
  productInputCreate?: Resolver<Maybe<ResolversTypes['ProductInput']>, ParentType, ContextType, RequireFields<MutationProductInputCreateArgs, 'data'>>;
  productInputDelete?: Resolver<Maybe<ResolversTypes['ProductInput']>, ParentType, ContextType, RequireFields<MutationProductInputDeleteArgs, 'id'>>;
  productInputUpdate?: Resolver<Maybe<ResolversTypes['ProductInput']>, ParentType, ContextType, RequireFields<MutationProductInputUpdateArgs, 'data'>>;
  removeSubProduct?: Resolver<Maybe<ResolversTypes['ProductInput']>, ParentType, ContextType, RequireFields<MutationRemoveSubProductArgs, 'productInputId' | 'subProductId'>>;
  shopCreate?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<MutationShopCreateArgs, 'data'>>;
  shopDelete?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<MutationShopDeleteArgs, 'id'>>;
  shopUpdate?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<MutationShopUpdateArgs, 'data'>>;
}>;

export type ParseErrorRangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParseErrorRange'] = ResolversParentTypes['ParseErrorRange']> = ResolversObject<{
  end?: Resolver<ResolversTypes['ErrorPosition'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['ErrorPosition'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ParseErrorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParseErrors'] = ResolversParentTypes['ParseErrors']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  range?: Resolver<ResolversTypes['ParseErrorRange'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductInput'] = ResolversParentTypes['ProductInput']> = ResolversObject<{
  adCopies?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  calculatorFields?: Resolver<Maybe<Array<ResolversTypes['CalculatorField']>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType>;
  competitorUrls?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  creativeUrls?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  customProductType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  descriptionHtml?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  giftCard?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['ImageInput']>>, ParentType, ContextType>;
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  productType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requiresSellingPlan?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  seo?: Resolver<Maybe<ResolversTypes['SEOInput']>, ParentType, ContextType>;
  standardizedProductType?: Resolver<Maybe<ResolversTypes['StandardizedProductTypeInput']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  subProducts?: Resolver<Maybe<Array<ResolversTypes['ProductInput']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  templateSuffix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  variants?: Resolver<Maybe<Array<ResolversTypes['ProductVariantInput']>>, ParentType, ContextType>;
  vendor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductInputsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductInputsResponse'] = ResolversParentTypes['ProductInputsResponse']> = ResolversObject<{
  nodes?: Resolver<Maybe<Array<ResolversTypes['ProductInput']>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductVariantInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductVariantInput'] = ResolversParentTypes['ProductVariantInput']> = ResolversObject<{
  barcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  compareAtPrice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fulfillmentServiceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  harmonizedSystemCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageSrc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inventoryItem?: Resolver<Maybe<ResolversTypes['InventoryItemInput']>, ParentType, ContextType>;
  inventoryManagement?: Resolver<Maybe<ResolversTypes['ProductVariantInventoryManagement']>, ParentType, ContextType>;
  inventoryPolicy?: Resolver<Maybe<ResolversTypes['ProductVariantInventoryPolicy']>, ParentType, ContextType>;
  inventoryQuantities?: Resolver<Maybe<ResolversTypes['InventoryLevelInput']>, ParentType, ContextType>;
  mediaSrc?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  options?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requiresShipping?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weightUnit?: Resolver<Maybe<ResolversTypes['WeightUnit']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  calculatorFields?: Resolver<ResolversTypes['CalculatorFieldsResponse'], ParentType, ContextType, Partial<QueryCalculatorFieldsArgs>>;
  categories?: Resolver<ResolversTypes['CategoriesResponse'], ParentType, ContextType, Partial<QueryCategoriesArgs>>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, Partial<QueryCategoryArgs>>;
  productInput?: Resolver<Maybe<ResolversTypes['ProductInput']>, ParentType, ContextType, Partial<QueryProductInputArgs>>;
  productInputs?: Resolver<ResolversTypes['ProductInputsResponse'], ParentType, ContextType, Partial<QueryProductInputsArgs>>;
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, Partial<QueryShopArgs>>;
  shopifyqlResponse?: Resolver<Maybe<ResolversTypes['ShopifyqlResponse']>, ParentType, ContextType, RequireFields<QueryShopifyqlResponseArgs, 'query' | 'shopId'>>;
  shops?: Resolver<ResolversTypes['ShopsResponse'], ParentType, ContextType, Partial<QueryShopsArgs>>;
  subProducts?: Resolver<ResolversTypes['SubProductsResponse'], ParentType, ContextType, RequireFields<QuerySubProductsArgs, 'productInputId'>>;
}>;

export type SeoInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['SEOInput'] = ResolversParentTypes['SEOInput']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShopResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shop'] = ResolversParentTypes['Shop']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShopifyqlResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShopifyqlResponse'] = ResolversParentTypes['ShopifyqlResponse']> = ResolversObject<{
  parseErrors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ParseErrors']>>>, ParentType, ContextType>;
  tableData?: Resolver<Maybe<ResolversTypes['TableData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShopsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShopsResponse'] = ResolversParentTypes['ShopsResponse']> = ResolversObject<{
  nodes?: Resolver<Maybe<Array<ResolversTypes['Shop']>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StandardizedProductTypeInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['StandardizedProductTypeInput'] = ResolversParentTypes['StandardizedProductTypeInput']> = ResolversObject<{
  id_?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productTaxonomyNodeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubProductsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubProductsResponse'] = ResolversParentTypes['SubProductsResponse']> = ResolversObject<{
  nodes?: Resolver<Maybe<Array<ResolversTypes['ProductInput']>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TableDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TableData'] = ResolversParentTypes['TableData']> = ResolversObject<{
  columns?: Resolver<Maybe<Array<ResolversTypes['TableDataColumn']>>, ParentType, ContextType>;
  rowData?: Resolver<Maybe<Array<Array<Maybe<ResolversTypes['String']>>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TableDataColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['TableDataColumn'] = ResolversParentTypes['TableDataColumn']> = ResolversObject<{
  dataType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id_?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CalculatorField?: CalculatorFieldResolvers<ContextType>;
  CalculatorFieldsResponse?: CalculatorFieldsResponseResolvers<ContextType>;
  CategoriesResponse?: CategoriesResponseResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  ErrorPosition?: ErrorPositionResolvers<ContextType>;
  ImageInput?: ImageInputResolvers<ContextType>;
  InventoryItemInput?: InventoryItemInputResolvers<ContextType>;
  InventoryLevelInput?: InventoryLevelInputResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Login?: LoginResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ParseErrorRange?: ParseErrorRangeResolvers<ContextType>;
  ParseErrors?: ParseErrorsResolvers<ContextType>;
  ProductInput?: ProductInputResolvers<ContextType>;
  ProductInputsResponse?: ProductInputsResponseResolvers<ContextType>;
  ProductVariantInput?: ProductVariantInputResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SEOInput?: SeoInputResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  ShopifyqlResponse?: ShopifyqlResponseResolvers<ContextType>;
  ShopsResponse?: ShopsResponseResolvers<ContextType>;
  StandardizedProductTypeInput?: StandardizedProductTypeInputResolvers<ContextType>;
  SubProductsResponse?: SubProductsResponseResolvers<ContextType>;
  TableData?: TableDataResolvers<ContextType>;
  TableDataColumn?: TableDataColumnResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


export type CalculatorFieldsUpdateOrCreateMutationVariables = Exact<{
  productInputId: Scalars['String'];
  data: Array<CalculatorFieldCreateInput> | CalculatorFieldCreateInput;
}>;


export type CalculatorFieldsUpdateOrCreateMutation = { __typename?: 'Mutation', calculatorFieldsUpdateOrCreate?: { __typename?: 'CalculatorFieldsResponse', nodes?: Array<{ __typename?: 'CalculatorField', id: string, order: number, type: string, name: string, label: string, operation: string, value: number, group?: string | null, groupDetail?: string | null, groupOrder?: string | null, currency?: string | null, canBeDeleted?: boolean | null }> | null } | null };

export type CalculatorFieldsQueryVariables = Exact<{
  productInputId?: InputMaybe<Scalars['String']>;
}>;


export type CalculatorFieldsQuery = { __typename?: 'Query', calculatorFields: { __typename?: 'CalculatorFieldsResponse', nodes?: Array<{ __typename?: 'CalculatorField', id: string, order: number, type: string, name: string, label: string, operation: string, value: number, group?: string | null, groupDetail?: string | null, groupOrder?: string | null, currency?: string | null, canBeDeleted?: boolean | null }> | null } };

export type CategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategoriesResponse', total?: number | null, nodes?: Array<{ __typename?: 'Category', id_: string, name: string }> | null } };

export type CategoryQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['String']>;
}>;


export type CategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id_: string, name: string } | null };

export type CategoryNameQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['String']>;
}>;


export type CategoryNameQuery = { __typename?: 'Query', category?: { __typename?: 'Category', name: string } | null };

export type CategoryCreateMutationVariables = Exact<{
  data: CategoryCreateInput;
}>;


export type CategoryCreateMutation = { __typename?: 'Mutation', categoryCreate?: { __typename?: 'Category', id_: string, name: string } | null };

export type CategoryDeleteMutationVariables = Exact<{
  categoryDeleteId: Scalars['String'];
}>;


export type CategoryDeleteMutation = { __typename?: 'Mutation', categoryDelete?: { __typename?: 'Category', id_: string, name: string } | null };

export type InjectProductInShopifyMutationVariables = Exact<{
  shopId: Scalars['String'];
  productInputId: Scalars['String'];
}>;


export type InjectProductInShopifyMutation = { __typename?: 'Mutation', injectProductInShopify?: any | null };

export type ProductInputCreateMutationVariables = Exact<{
  data: ProductInputCreateInput;
}>;


export type ProductInputCreateMutation = { __typename?: 'Mutation', productInputCreate?: { __typename?: 'ProductInput', id_?: string | null, customProductType?: string | null, descriptionHtml?: string | null, giftCard?: boolean | null, handle?: string | null, options?: Array<string | null> | null, productType?: string | null, requiresSellingPlan?: boolean | null, status?: Status | null, tags?: Array<string | null> | null, templateSuffix?: string | null, title?: string | null, vendor?: string | null, creativeUrls?: Array<string> | null, adCopies?: Array<string> | null, competitorUrls?: Array<string> | null, images?: Array<{ __typename?: 'ImageInput', id_?: string | null, altText?: string | null, src?: string | null }> | null, seo?: { __typename?: 'SEOInput', id_?: string | null, description?: string | null, title?: string | null } | null, standardizedProductType?: { __typename?: 'StandardizedProductTypeInput', id_?: string | null, productTaxonomyNodeId?: string | null } | null, variants?: Array<{ __typename?: 'ProductVariantInput', id_?: string | null, barcode?: string | null, fulfillmentServiceId?: string | null, harmonizedSystemCode?: string | null, imageId?: string | null, imageSrc?: string | null, inventoryManagement?: ProductVariantInventoryManagement | null, inventoryPolicy?: ProductVariantInventoryPolicy | null, mediaSrc?: Array<string> | null, options?: Array<string> | null, price?: string | null, productId?: string | null, requiresShipping?: boolean | null, sku?: string | null, taxCode?: string | null, taxable?: boolean | null, title?: string | null, weight?: number | null, weightUnit?: WeightUnit | null, inventoryItem?: { __typename?: 'InventoryItemInput', id_?: string | null, cost?: number | null, tracked?: boolean | null } | null, inventoryQuantities?: { __typename?: 'InventoryLevelInput', id_?: string | null, availableQuantity: number, locationId: string } | null }> | null } | null };

export type ProductInputUpdateMutationVariables = Exact<{
  updateData: ProductInputUpdateInput;
}>;


export type ProductInputUpdateMutation = { __typename?: 'Mutation', productInputUpdate?: { __typename?: 'ProductInput', id_?: string | null, customProductType?: string | null, descriptionHtml?: string | null, giftCard?: boolean | null, handle?: string | null, options?: Array<string | null> | null, productType?: string | null, requiresSellingPlan?: boolean | null, status?: Status | null, tags?: Array<string | null> | null, templateSuffix?: string | null, title?: string | null, vendor?: string | null, creativeUrls?: Array<string> | null, adCopies?: Array<string> | null, competitorUrls?: Array<string> | null, images?: Array<{ __typename?: 'ImageInput', id_?: string | null, altText?: string | null, src?: string | null }> | null, seo?: { __typename?: 'SEOInput', id_?: string | null, description?: string | null, title?: string | null } | null, standardizedProductType?: { __typename?: 'StandardizedProductTypeInput', id_?: string | null, productTaxonomyNodeId?: string | null } | null, variants?: Array<{ __typename?: 'ProductVariantInput', id_?: string | null, barcode?: string | null, compareAtPrice?: string | null, fulfillmentServiceId?: string | null, harmonizedSystemCode?: string | null, imageId?: string | null, imageSrc?: string | null, inventoryManagement?: ProductVariantInventoryManagement | null, inventoryPolicy?: ProductVariantInventoryPolicy | null, mediaSrc?: Array<string> | null, options?: Array<string> | null, price?: string | null, productId?: string | null, requiresShipping?: boolean | null, sku?: string | null, taxCode?: string | null, taxable?: boolean | null, title?: string | null, weight?: number | null, weightUnit?: WeightUnit | null, inventoryItem?: { __typename?: 'InventoryItemInput', id_?: string | null, cost?: number | null, tracked?: boolean | null } | null, inventoryQuantities?: { __typename?: 'InventoryLevelInput', id_?: string | null, availableQuantity: number, locationId: string } | null }> | null } | null };

export type ProductInputDeleteMutationVariables = Exact<{
  productInputDeleteId: Scalars['String'];
}>;


export type ProductInputDeleteMutation = { __typename?: 'Mutation', productInputDelete?: { __typename?: 'ProductInput', id_?: string | null } | null };

export type ProductInputsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  includeSubProducts?: InputMaybe<Scalars['Boolean']>;
  categoryId?: InputMaybe<Scalars['String']>;
}>;


export type ProductInputsQuery = { __typename?: 'Query', productInputs: { __typename?: 'ProductInputsResponse', total?: number | null, nodes?: Array<{ __typename?: 'ProductInput', id_?: string | null, customProductType?: string | null, descriptionHtml?: string | null, giftCard?: boolean | null, handle?: string | null, options?: Array<string | null> | null, productType?: string | null, requiresSellingPlan?: boolean | null, status?: Status | null, tags?: Array<string | null> | null, templateSuffix?: string | null, title?: string | null, vendor?: string | null, creativeUrls?: Array<string> | null, adCopies?: Array<string> | null, competitorUrls?: Array<string> | null, images?: Array<{ __typename?: 'ImageInput', altText?: string | null, src?: string | null }> | null, seo?: { __typename?: 'SEOInput', description?: string | null, title?: string | null } | null, standardizedProductType?: { __typename?: 'StandardizedProductTypeInput', productTaxonomyNodeId?: string | null } | null, variants?: Array<{ __typename?: 'ProductVariantInput', barcode?: string | null, compareAtPrice?: string | null, fulfillmentServiceId?: string | null, harmonizedSystemCode?: string | null, imageId?: string | null, imageSrc?: string | null, inventoryManagement?: ProductVariantInventoryManagement | null, inventoryPolicy?: ProductVariantInventoryPolicy | null, mediaSrc?: Array<string> | null, options?: Array<string> | null, price?: string | null, productId?: string | null, requiresShipping?: boolean | null, sku?: string | null, taxCode?: string | null, taxable?: boolean | null, title?: string | null, weight?: number | null, weightUnit?: WeightUnit | null, inventoryItem?: { __typename?: 'InventoryItemInput', cost?: number | null, tracked?: boolean | null } | null, inventoryQuantities?: { __typename?: 'InventoryLevelInput', availableQuantity: number, locationId: string } | null }> | null, categories?: Array<{ __typename?: 'Category', id_: string, name: string }> | null }> | null } };

export type ProductInputQueryVariables = Exact<{
  productInputId?: InputMaybe<Scalars['String']>;
}>;


export type ProductInputQuery = { __typename?: 'Query', productInput?: { __typename?: 'ProductInput', id_?: string | null, customProductType?: string | null, descriptionHtml?: string | null, giftCard?: boolean | null, handle?: string | null, options?: Array<string | null> | null, productType?: string | null, requiresSellingPlan?: boolean | null, status?: Status | null, tags?: Array<string | null> | null, templateSuffix?: string | null, title?: string | null, vendor?: string | null, creativeUrls?: Array<string> | null, adCopies?: Array<string> | null, competitorUrls?: Array<string> | null, images?: Array<{ __typename?: 'ImageInput', altText?: string | null, src?: string | null }> | null, seo?: { __typename?: 'SEOInput', description?: string | null, title?: string | null } | null, standardizedProductType?: { __typename?: 'StandardizedProductTypeInput', productTaxonomyNodeId?: string | null } | null, variants?: Array<{ __typename?: 'ProductVariantInput', barcode?: string | null, compareAtPrice?: string | null, fulfillmentServiceId?: string | null, harmonizedSystemCode?: string | null, imageId?: string | null, imageSrc?: string | null, inventoryManagement?: ProductVariantInventoryManagement | null, inventoryPolicy?: ProductVariantInventoryPolicy | null, mediaSrc?: Array<string> | null, options?: Array<string> | null, price?: string | null, productId?: string | null, requiresShipping?: boolean | null, sku?: string | null, taxCode?: string | null, taxable?: boolean | null, title?: string | null, weight?: number | null, weightUnit?: WeightUnit | null, inventoryItem?: { __typename?: 'InventoryItemInput', cost?: number | null, tracked?: boolean | null } | null, inventoryQuantities?: { __typename?: 'InventoryLevelInput', availableQuantity: number, locationId: string } | null }> | null, categories?: Array<{ __typename?: 'Category', id_: string, name: string }> | null } | null };

export type ProductInputTitleQueryVariables = Exact<{
  productInputId?: InputMaybe<Scalars['String']>;
}>;


export type ProductInputTitleQuery = { __typename?: 'Query', productInput?: { __typename?: 'ProductInput', title?: string | null } | null };

export type ProductInputsTitleQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  includeSubProducts?: InputMaybe<Scalars['Boolean']>;
}>;


export type ProductInputsTitleQuery = { __typename?: 'Query', productInputs: { __typename?: 'ProductInputsResponse', nodes?: Array<{ __typename?: 'ProductInput', id_?: string | null, title?: string | null }> | null } };

export type ShopCreateMutationVariables = Exact<{
  data: ShopCreateInput;
}>;


export type ShopCreateMutation = { __typename?: 'Mutation', shopCreate?: { __typename?: 'Shop', id_: string, name: string, url: string, accessToken: string } | null };

export type ShopUpdateMutationVariables = Exact<{
  data: ShopUpdateInput;
}>;


export type ShopUpdateMutation = { __typename?: 'Mutation', shopUpdate?: { __typename?: 'Shop', id_: string, name: string, url: string, accessToken: string } | null };

export type ShopDeleteMutationVariables = Exact<{
  shopDeleteId: Scalars['String'];
}>;


export type ShopDeleteMutation = { __typename?: 'Mutation', shopDelete?: { __typename?: 'Shop', id_: string, name: string, url: string, accessToken: string } | null };

export type ShopsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type ShopsQuery = { __typename?: 'Query', shops: { __typename?: 'ShopsResponse', total?: number | null, nodes?: Array<{ __typename?: 'Shop', id_: string, name: string, url: string, accessToken: string }> | null } };

export type ShopQueryVariables = Exact<{
  shopId?: InputMaybe<Scalars['String']>;
}>;


export type ShopQuery = { __typename?: 'Query', shop?: { __typename?: 'Shop', id_: string, name: string, url: string, accessToken: string } | null };

export type ShopNameQueryVariables = Exact<{
  shopId?: InputMaybe<Scalars['String']>;
}>;


export type ShopNameQuery = { __typename?: 'Query', shop?: { __typename?: 'Shop', name: string } | null };

export type ShopifyqlResponseQueryVariables = Exact<{
  query: Scalars['String'];
  shopId: Scalars['String'];
}>;


export type ShopifyqlResponseQuery = { __typename?: 'Query', shopifyqlResponse?: { __typename?: 'ShopifyqlResponse', tableData?: { __typename?: 'TableData', rowData?: Array<Array<string | null>> | null, columns?: Array<{ __typename?: 'TableDataColumn', dataType: string, displayName: string, name: string }> | null } | null, parseErrors?: Array<{ __typename?: 'ParseErrors', code: string, message: string, range: { __typename?: 'ParseErrorRange', end: { __typename?: 'ErrorPosition', line: number, character: number }, start: { __typename?: 'ErrorPosition', character: number, line: number } } } | null> | null } | null };

export type CreateSubProductMutationVariables = Exact<{
  productInputId: Scalars['String'];
}>;


export type CreateSubProductMutation = { __typename?: 'Mutation', createSubProduct?: { __typename?: 'ProductInput', id_?: string | null } | null };

export type SubProductsQueryVariables = Exact<{
  productInputId: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type SubProductsQuery = { __typename?: 'Query', subProducts: { __typename?: 'SubProductsResponse', total?: number | null, nodes?: Array<{ __typename?: 'ProductInput', id_?: string | null, customProductType?: string | null, descriptionHtml?: string | null, giftCard?: boolean | null, handle?: string | null, options?: Array<string | null> | null, productType?: string | null, requiresSellingPlan?: boolean | null, status?: Status | null, tags?: Array<string | null> | null, templateSuffix?: string | null, title?: string | null, vendor?: string | null, images?: Array<{ __typename?: 'ImageInput', id_?: string | null, altText?: string | null, src?: string | null }> | null, seo?: { __typename?: 'SEOInput', id_?: string | null, description?: string | null, title?: string | null } | null, standardizedProductType?: { __typename?: 'StandardizedProductTypeInput', id_?: string | null, productTaxonomyNodeId?: string | null } | null, variants?: Array<{ __typename?: 'ProductVariantInput', id_?: string | null, barcode?: string | null, compareAtPrice?: string | null, fulfillmentServiceId?: string | null, harmonizedSystemCode?: string | null, imageId?: string | null, imageSrc?: string | null, inventoryManagement?: ProductVariantInventoryManagement | null, inventoryPolicy?: ProductVariantInventoryPolicy | null, mediaSrc?: Array<string> | null, options?: Array<string> | null, price?: string | null, productId?: string | null, requiresShipping?: boolean | null, sku?: string | null, taxCode?: string | null, taxable?: boolean | null, title?: string | null, weight?: number | null, weightUnit?: WeightUnit | null, inventoryItem?: { __typename?: 'InventoryItemInput', id_?: string | null, cost?: number | null, tracked?: boolean | null } | null, inventoryQuantities?: { __typename?: 'InventoryLevelInput', id_?: string | null, availableQuantity: number, locationId: string } | null }> | null }> | null } };


export const CalculatorFieldsUpdateOrCreateDocument = gql`
    mutation CalculatorFieldsUpdateOrCreate($productInputId: String!, $data: [CalculatorFieldCreateInput!]!) {
  calculatorFieldsUpdateOrCreate(productInputId: $productInputId, data: $data) {
    nodes {
      id
      order
      type
      name
      label
      operation
      value
      group
      groupDetail
      groupOrder
      currency
      canBeDeleted
    }
  }
}
    `;
export type CalculatorFieldsUpdateOrCreateMutationFn = Apollo.MutationFunction<CalculatorFieldsUpdateOrCreateMutation, CalculatorFieldsUpdateOrCreateMutationVariables>;

/**
 * __useCalculatorFieldsUpdateOrCreateMutation__
 *
 * To run a mutation, you first call `useCalculatorFieldsUpdateOrCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCalculatorFieldsUpdateOrCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [calculatorFieldsUpdateOrCreateMutation, { data, loading, error }] = useCalculatorFieldsUpdateOrCreateMutation({
 *   variables: {
 *      productInputId: // value for 'productInputId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCalculatorFieldsUpdateOrCreateMutation(baseOptions?: Apollo.MutationHookOptions<CalculatorFieldsUpdateOrCreateMutation, CalculatorFieldsUpdateOrCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CalculatorFieldsUpdateOrCreateMutation, CalculatorFieldsUpdateOrCreateMutationVariables>(CalculatorFieldsUpdateOrCreateDocument, options);
      }
export type CalculatorFieldsUpdateOrCreateMutationHookResult = ReturnType<typeof useCalculatorFieldsUpdateOrCreateMutation>;
export type CalculatorFieldsUpdateOrCreateMutationResult = Apollo.MutationResult<CalculatorFieldsUpdateOrCreateMutation>;
export type CalculatorFieldsUpdateOrCreateMutationOptions = Apollo.BaseMutationOptions<CalculatorFieldsUpdateOrCreateMutation, CalculatorFieldsUpdateOrCreateMutationVariables>;
export const CalculatorFieldsDocument = gql`
    query CalculatorFields($productInputId: String) {
  calculatorFields(productInputId: $productInputId) {
    nodes {
      id
      order
      type
      name
      label
      operation
      value
      group
      groupDetail
      groupOrder
      currency
      canBeDeleted
    }
  }
}
    `;

/**
 * __useCalculatorFieldsQuery__
 *
 * To run a query within a React component, call `useCalculatorFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalculatorFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculatorFieldsQuery({
 *   variables: {
 *      productInputId: // value for 'productInputId'
 *   },
 * });
 */
export function useCalculatorFieldsQuery(baseOptions?: Apollo.QueryHookOptions<CalculatorFieldsQuery, CalculatorFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CalculatorFieldsQuery, CalculatorFieldsQueryVariables>(CalculatorFieldsDocument, options);
      }
export function useCalculatorFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CalculatorFieldsQuery, CalculatorFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CalculatorFieldsQuery, CalculatorFieldsQueryVariables>(CalculatorFieldsDocument, options);
        }
export type CalculatorFieldsQueryHookResult = ReturnType<typeof useCalculatorFieldsQuery>;
export type CalculatorFieldsLazyQueryHookResult = ReturnType<typeof useCalculatorFieldsLazyQuery>;
export type CalculatorFieldsQueryResult = Apollo.QueryResult<CalculatorFieldsQuery, CalculatorFieldsQueryVariables>;
export const CategoriesDocument = gql`
    query Categories($skip: Int, $take: Int) {
  categories(skip: $skip, take: $take) {
    nodes {
      id_
      name
    }
    total
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryDocument = gql`
    query Category($categoryId: String) {
  category(id: $categoryId) {
    id_
    name
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions?: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const CategoryNameDocument = gql`
    query CategoryName($categoryId: String) {
  category(id: $categoryId) {
    name
  }
}
    `;

/**
 * __useCategoryNameQuery__
 *
 * To run a query within a React component, call `useCategoryNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryNameQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryNameQuery(baseOptions?: Apollo.QueryHookOptions<CategoryNameQuery, CategoryNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryNameQuery, CategoryNameQueryVariables>(CategoryNameDocument, options);
      }
export function useCategoryNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryNameQuery, CategoryNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryNameQuery, CategoryNameQueryVariables>(CategoryNameDocument, options);
        }
export type CategoryNameQueryHookResult = ReturnType<typeof useCategoryNameQuery>;
export type CategoryNameLazyQueryHookResult = ReturnType<typeof useCategoryNameLazyQuery>;
export type CategoryNameQueryResult = Apollo.QueryResult<CategoryNameQuery, CategoryNameQueryVariables>;
export const CategoryCreateDocument = gql`
    mutation CategoryCreate($data: CategoryCreateInput!) {
  categoryCreate(data: $data) {
    id_
    name
  }
}
    `;
export type CategoryCreateMutationFn = Apollo.MutationFunction<CategoryCreateMutation, CategoryCreateMutationVariables>;

/**
 * __useCategoryCreateMutation__
 *
 * To run a mutation, you first call `useCategoryCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryCreateMutation, { data, loading, error }] = useCategoryCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCategoryCreateMutation(baseOptions?: Apollo.MutationHookOptions<CategoryCreateMutation, CategoryCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CategoryCreateMutation, CategoryCreateMutationVariables>(CategoryCreateDocument, options);
      }
export type CategoryCreateMutationHookResult = ReturnType<typeof useCategoryCreateMutation>;
export type CategoryCreateMutationResult = Apollo.MutationResult<CategoryCreateMutation>;
export type CategoryCreateMutationOptions = Apollo.BaseMutationOptions<CategoryCreateMutation, CategoryCreateMutationVariables>;
export const CategoryDeleteDocument = gql`
    mutation CategoryDelete($categoryDeleteId: String!) {
  categoryDelete(id: $categoryDeleteId) {
    id_
    name
  }
}
    `;
export type CategoryDeleteMutationFn = Apollo.MutationFunction<CategoryDeleteMutation, CategoryDeleteMutationVariables>;

/**
 * __useCategoryDeleteMutation__
 *
 * To run a mutation, you first call `useCategoryDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryDeleteMutation, { data, loading, error }] = useCategoryDeleteMutation({
 *   variables: {
 *      categoryDeleteId: // value for 'categoryDeleteId'
 *   },
 * });
 */
export function useCategoryDeleteMutation(baseOptions?: Apollo.MutationHookOptions<CategoryDeleteMutation, CategoryDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CategoryDeleteMutation, CategoryDeleteMutationVariables>(CategoryDeleteDocument, options);
      }
export type CategoryDeleteMutationHookResult = ReturnType<typeof useCategoryDeleteMutation>;
export type CategoryDeleteMutationResult = Apollo.MutationResult<CategoryDeleteMutation>;
export type CategoryDeleteMutationOptions = Apollo.BaseMutationOptions<CategoryDeleteMutation, CategoryDeleteMutationVariables>;
export const InjectProductInShopifyDocument = gql`
    mutation InjectProductInShopify($shopId: String!, $productInputId: String!) {
  injectProductInShopify(shopId: $shopId, productInputId: $productInputId)
}
    `;
export type InjectProductInShopifyMutationFn = Apollo.MutationFunction<InjectProductInShopifyMutation, InjectProductInShopifyMutationVariables>;

/**
 * __useInjectProductInShopifyMutation__
 *
 * To run a mutation, you first call `useInjectProductInShopifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInjectProductInShopifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [injectProductInShopifyMutation, { data, loading, error }] = useInjectProductInShopifyMutation({
 *   variables: {
 *      shopId: // value for 'shopId'
 *      productInputId: // value for 'productInputId'
 *   },
 * });
 */
export function useInjectProductInShopifyMutation(baseOptions?: Apollo.MutationHookOptions<InjectProductInShopifyMutation, InjectProductInShopifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InjectProductInShopifyMutation, InjectProductInShopifyMutationVariables>(InjectProductInShopifyDocument, options);
      }
export type InjectProductInShopifyMutationHookResult = ReturnType<typeof useInjectProductInShopifyMutation>;
export type InjectProductInShopifyMutationResult = Apollo.MutationResult<InjectProductInShopifyMutation>;
export type InjectProductInShopifyMutationOptions = Apollo.BaseMutationOptions<InjectProductInShopifyMutation, InjectProductInShopifyMutationVariables>;
export const ProductInputCreateDocument = gql`
    mutation ProductInputCreate($data: ProductInputCreateInput!) {
  productInputCreate(data: $data) {
    id_
    customProductType
    descriptionHtml
    giftCard
    handle
    images {
      id_
      altText
      src
    }
    options
    productType
    requiresSellingPlan
    seo {
      id_
      description
      title
    }
    standardizedProductType {
      id_
      productTaxonomyNodeId
    }
    status
    tags
    templateSuffix
    title
    variants {
      id_
      barcode
      fulfillmentServiceId
      harmonizedSystemCode
      imageId
      imageSrc
      inventoryItem {
        id_
        cost
        tracked
      }
      inventoryManagement
      inventoryPolicy
      inventoryQuantities {
        id_
        availableQuantity
        locationId
      }
      mediaSrc
      options
      price
      productId
      requiresShipping
      sku
      taxCode
      taxable
      title
      weight
      weightUnit
    }
    vendor
    creativeUrls
    adCopies
    competitorUrls
  }
}
    `;
export type ProductInputCreateMutationFn = Apollo.MutationFunction<ProductInputCreateMutation, ProductInputCreateMutationVariables>;

/**
 * __useProductInputCreateMutation__
 *
 * To run a mutation, you first call `useProductInputCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductInputCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productInputCreateMutation, { data, loading, error }] = useProductInputCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProductInputCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProductInputCreateMutation, ProductInputCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductInputCreateMutation, ProductInputCreateMutationVariables>(ProductInputCreateDocument, options);
      }
export type ProductInputCreateMutationHookResult = ReturnType<typeof useProductInputCreateMutation>;
export type ProductInputCreateMutationResult = Apollo.MutationResult<ProductInputCreateMutation>;
export type ProductInputCreateMutationOptions = Apollo.BaseMutationOptions<ProductInputCreateMutation, ProductInputCreateMutationVariables>;
export const ProductInputUpdateDocument = gql`
    mutation ProductInputUpdate($updateData: ProductInputUpdateInput!) {
  productInputUpdate(data: $updateData) {
    id_
    customProductType
    descriptionHtml
    giftCard
    handle
    images {
      id_
      altText
      src
    }
    options
    productType
    requiresSellingPlan
    seo {
      id_
      description
      title
    }
    standardizedProductType {
      id_
      productTaxonomyNodeId
    }
    status
    tags
    templateSuffix
    title
    variants {
      id_
      barcode
      compareAtPrice
      fulfillmentServiceId
      harmonizedSystemCode
      imageId
      imageSrc
      inventoryItem {
        id_
        cost
        tracked
      }
      inventoryManagement
      inventoryPolicy
      inventoryQuantities {
        id_
        availableQuantity
        locationId
      }
      mediaSrc
      options
      price
      productId
      requiresShipping
      sku
      taxCode
      taxable
      title
      weight
      weightUnit
    }
    vendor
    creativeUrls
    adCopies
    competitorUrls
  }
}
    `;
export type ProductInputUpdateMutationFn = Apollo.MutationFunction<ProductInputUpdateMutation, ProductInputUpdateMutationVariables>;

/**
 * __useProductInputUpdateMutation__
 *
 * To run a mutation, you first call `useProductInputUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductInputUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productInputUpdateMutation, { data, loading, error }] = useProductInputUpdateMutation({
 *   variables: {
 *      updateData: // value for 'updateData'
 *   },
 * });
 */
export function useProductInputUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProductInputUpdateMutation, ProductInputUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductInputUpdateMutation, ProductInputUpdateMutationVariables>(ProductInputUpdateDocument, options);
      }
export type ProductInputUpdateMutationHookResult = ReturnType<typeof useProductInputUpdateMutation>;
export type ProductInputUpdateMutationResult = Apollo.MutationResult<ProductInputUpdateMutation>;
export type ProductInputUpdateMutationOptions = Apollo.BaseMutationOptions<ProductInputUpdateMutation, ProductInputUpdateMutationVariables>;
export const ProductInputDeleteDocument = gql`
    mutation ProductInputDelete($productInputDeleteId: String!) {
  productInputDelete(id: $productInputDeleteId) {
    id_
  }
}
    `;
export type ProductInputDeleteMutationFn = Apollo.MutationFunction<ProductInputDeleteMutation, ProductInputDeleteMutationVariables>;

/**
 * __useProductInputDeleteMutation__
 *
 * To run a mutation, you first call `useProductInputDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductInputDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productInputDeleteMutation, { data, loading, error }] = useProductInputDeleteMutation({
 *   variables: {
 *      productInputDeleteId: // value for 'productInputDeleteId'
 *   },
 * });
 */
export function useProductInputDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ProductInputDeleteMutation, ProductInputDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductInputDeleteMutation, ProductInputDeleteMutationVariables>(ProductInputDeleteDocument, options);
      }
export type ProductInputDeleteMutationHookResult = ReturnType<typeof useProductInputDeleteMutation>;
export type ProductInputDeleteMutationResult = Apollo.MutationResult<ProductInputDeleteMutation>;
export type ProductInputDeleteMutationOptions = Apollo.BaseMutationOptions<ProductInputDeleteMutation, ProductInputDeleteMutationVariables>;
export const ProductInputsDocument = gql`
    query ProductInputs($skip: Int, $take: Int, $includeSubProducts: Boolean, $categoryId: String) {
  productInputs(
    skip: $skip
    take: $take
    includeSubProducts: $includeSubProducts
    categoryId: $categoryId
  ) {
    total
    nodes {
      id_
      customProductType
      descriptionHtml
      giftCard
      handle
      images {
        altText
        src
      }
      options
      productType
      requiresSellingPlan
      seo {
        description
        title
      }
      standardizedProductType {
        productTaxonomyNodeId
      }
      status
      tags
      templateSuffix
      title
      variants {
        barcode
        compareAtPrice
        fulfillmentServiceId
        harmonizedSystemCode
        imageId
        imageSrc
        inventoryItem {
          cost
          tracked
        }
        inventoryManagement
        inventoryPolicy
        inventoryQuantities {
          availableQuantity
          locationId
        }
        mediaSrc
        options
        price
        productId
        requiresShipping
        sku
        taxCode
        taxable
        title
        weight
        weightUnit
      }
      vendor
      creativeUrls
      adCopies
      categories {
        id_
        name
      }
      competitorUrls
    }
  }
}
    `;

/**
 * __useProductInputsQuery__
 *
 * To run a query within a React component, call `useProductInputsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductInputsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductInputsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      includeSubProducts: // value for 'includeSubProducts'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useProductInputsQuery(baseOptions?: Apollo.QueryHookOptions<ProductInputsQuery, ProductInputsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductInputsQuery, ProductInputsQueryVariables>(ProductInputsDocument, options);
      }
export function useProductInputsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductInputsQuery, ProductInputsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductInputsQuery, ProductInputsQueryVariables>(ProductInputsDocument, options);
        }
export type ProductInputsQueryHookResult = ReturnType<typeof useProductInputsQuery>;
export type ProductInputsLazyQueryHookResult = ReturnType<typeof useProductInputsLazyQuery>;
export type ProductInputsQueryResult = Apollo.QueryResult<ProductInputsQuery, ProductInputsQueryVariables>;
export const ProductInputDocument = gql`
    query ProductInput($productInputId: String) {
  productInput(id: $productInputId) {
    id_
    customProductType
    descriptionHtml
    giftCard
    handle
    images {
      altText
      src
    }
    options
    productType
    requiresSellingPlan
    seo {
      description
      title
    }
    standardizedProductType {
      productTaxonomyNodeId
    }
    status
    tags
    templateSuffix
    title
    variants {
      barcode
      compareAtPrice
      fulfillmentServiceId
      harmonizedSystemCode
      imageId
      imageSrc
      inventoryItem {
        cost
        tracked
      }
      inventoryManagement
      inventoryPolicy
      inventoryQuantities {
        availableQuantity
        locationId
      }
      mediaSrc
      options
      price
      productId
      requiresShipping
      sku
      taxCode
      taxable
      title
      weight
      weightUnit
    }
    vendor
    creativeUrls
    adCopies
    categories {
      id_
      name
    }
    competitorUrls
  }
}
    `;

/**
 * __useProductInputQuery__
 *
 * To run a query within a React component, call `useProductInputQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductInputQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductInputQuery({
 *   variables: {
 *      productInputId: // value for 'productInputId'
 *   },
 * });
 */
export function useProductInputQuery(baseOptions?: Apollo.QueryHookOptions<ProductInputQuery, ProductInputQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductInputQuery, ProductInputQueryVariables>(ProductInputDocument, options);
      }
export function useProductInputLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductInputQuery, ProductInputQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductInputQuery, ProductInputQueryVariables>(ProductInputDocument, options);
        }
export type ProductInputQueryHookResult = ReturnType<typeof useProductInputQuery>;
export type ProductInputLazyQueryHookResult = ReturnType<typeof useProductInputLazyQuery>;
export type ProductInputQueryResult = Apollo.QueryResult<ProductInputQuery, ProductInputQueryVariables>;
export const ProductInputTitleDocument = gql`
    query ProductInputTitle($productInputId: String) {
  productInput(id: $productInputId) {
    title
  }
}
    `;

/**
 * __useProductInputTitleQuery__
 *
 * To run a query within a React component, call `useProductInputTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductInputTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductInputTitleQuery({
 *   variables: {
 *      productInputId: // value for 'productInputId'
 *   },
 * });
 */
export function useProductInputTitleQuery(baseOptions?: Apollo.QueryHookOptions<ProductInputTitleQuery, ProductInputTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductInputTitleQuery, ProductInputTitleQueryVariables>(ProductInputTitleDocument, options);
      }
export function useProductInputTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductInputTitleQuery, ProductInputTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductInputTitleQuery, ProductInputTitleQueryVariables>(ProductInputTitleDocument, options);
        }
export type ProductInputTitleQueryHookResult = ReturnType<typeof useProductInputTitleQuery>;
export type ProductInputTitleLazyQueryHookResult = ReturnType<typeof useProductInputTitleLazyQuery>;
export type ProductInputTitleQueryResult = Apollo.QueryResult<ProductInputTitleQuery, ProductInputTitleQueryVariables>;
export const ProductInputsTitleDocument = gql`
    query ProductInputsTitle($skip: Int, $take: Int, $includeSubProducts: Boolean) {
  productInputs(skip: $skip, take: $take, includeSubProducts: $includeSubProducts) {
    nodes {
      id_
      title
    }
  }
}
    `;

/**
 * __useProductInputsTitleQuery__
 *
 * To run a query within a React component, call `useProductInputsTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductInputsTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductInputsTitleQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      includeSubProducts: // value for 'includeSubProducts'
 *   },
 * });
 */
export function useProductInputsTitleQuery(baseOptions?: Apollo.QueryHookOptions<ProductInputsTitleQuery, ProductInputsTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductInputsTitleQuery, ProductInputsTitleQueryVariables>(ProductInputsTitleDocument, options);
      }
export function useProductInputsTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductInputsTitleQuery, ProductInputsTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductInputsTitleQuery, ProductInputsTitleQueryVariables>(ProductInputsTitleDocument, options);
        }
export type ProductInputsTitleQueryHookResult = ReturnType<typeof useProductInputsTitleQuery>;
export type ProductInputsTitleLazyQueryHookResult = ReturnType<typeof useProductInputsTitleLazyQuery>;
export type ProductInputsTitleQueryResult = Apollo.QueryResult<ProductInputsTitleQuery, ProductInputsTitleQueryVariables>;
export const ShopCreateDocument = gql`
    mutation ShopCreate($data: ShopCreateInput!) {
  shopCreate(data: $data) {
    id_
    name
    url
    accessToken
  }
}
    `;
export type ShopCreateMutationFn = Apollo.MutationFunction<ShopCreateMutation, ShopCreateMutationVariables>;

/**
 * __useShopCreateMutation__
 *
 * To run a mutation, you first call `useShopCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShopCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shopCreateMutation, { data, loading, error }] = useShopCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useShopCreateMutation(baseOptions?: Apollo.MutationHookOptions<ShopCreateMutation, ShopCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShopCreateMutation, ShopCreateMutationVariables>(ShopCreateDocument, options);
      }
export type ShopCreateMutationHookResult = ReturnType<typeof useShopCreateMutation>;
export type ShopCreateMutationResult = Apollo.MutationResult<ShopCreateMutation>;
export type ShopCreateMutationOptions = Apollo.BaseMutationOptions<ShopCreateMutation, ShopCreateMutationVariables>;
export const ShopUpdateDocument = gql`
    mutation ShopUpdate($data: ShopUpdateInput!) {
  shopUpdate(data: $data) {
    id_
    name
    url
    accessToken
  }
}
    `;
export type ShopUpdateMutationFn = Apollo.MutationFunction<ShopUpdateMutation, ShopUpdateMutationVariables>;

/**
 * __useShopUpdateMutation__
 *
 * To run a mutation, you first call `useShopUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShopUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shopUpdateMutation, { data, loading, error }] = useShopUpdateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useShopUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ShopUpdateMutation, ShopUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShopUpdateMutation, ShopUpdateMutationVariables>(ShopUpdateDocument, options);
      }
export type ShopUpdateMutationHookResult = ReturnType<typeof useShopUpdateMutation>;
export type ShopUpdateMutationResult = Apollo.MutationResult<ShopUpdateMutation>;
export type ShopUpdateMutationOptions = Apollo.BaseMutationOptions<ShopUpdateMutation, ShopUpdateMutationVariables>;
export const ShopDeleteDocument = gql`
    mutation ShopDelete($shopDeleteId: String!) {
  shopDelete(id: $shopDeleteId) {
    id_
    name
    url
    accessToken
  }
}
    `;
export type ShopDeleteMutationFn = Apollo.MutationFunction<ShopDeleteMutation, ShopDeleteMutationVariables>;

/**
 * __useShopDeleteMutation__
 *
 * To run a mutation, you first call `useShopDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShopDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shopDeleteMutation, { data, loading, error }] = useShopDeleteMutation({
 *   variables: {
 *      shopDeleteId: // value for 'shopDeleteId'
 *   },
 * });
 */
export function useShopDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ShopDeleteMutation, ShopDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShopDeleteMutation, ShopDeleteMutationVariables>(ShopDeleteDocument, options);
      }
export type ShopDeleteMutationHookResult = ReturnType<typeof useShopDeleteMutation>;
export type ShopDeleteMutationResult = Apollo.MutationResult<ShopDeleteMutation>;
export type ShopDeleteMutationOptions = Apollo.BaseMutationOptions<ShopDeleteMutation, ShopDeleteMutationVariables>;
export const ShopsDocument = gql`
    query Shops($skip: Int, $take: Int) {
  shops(skip: $skip, take: $take) {
    total
    nodes {
      id_
      name
      url
      accessToken
    }
  }
}
    `;

/**
 * __useShopsQuery__
 *
 * To run a query within a React component, call `useShopsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShopsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShopsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useShopsQuery(baseOptions?: Apollo.QueryHookOptions<ShopsQuery, ShopsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShopsQuery, ShopsQueryVariables>(ShopsDocument, options);
      }
export function useShopsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShopsQuery, ShopsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShopsQuery, ShopsQueryVariables>(ShopsDocument, options);
        }
export type ShopsQueryHookResult = ReturnType<typeof useShopsQuery>;
export type ShopsLazyQueryHookResult = ReturnType<typeof useShopsLazyQuery>;
export type ShopsQueryResult = Apollo.QueryResult<ShopsQuery, ShopsQueryVariables>;
export const ShopDocument = gql`
    query Shop($shopId: String) {
  shop(id: $shopId) {
    id_
    name
    url
    accessToken
  }
}
    `;

/**
 * __useShopQuery__
 *
 * To run a query within a React component, call `useShopQuery` and pass it any options that fit your needs.
 * When your component renders, `useShopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShopQuery({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useShopQuery(baseOptions?: Apollo.QueryHookOptions<ShopQuery, ShopQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShopQuery, ShopQueryVariables>(ShopDocument, options);
      }
export function useShopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShopQuery, ShopQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShopQuery, ShopQueryVariables>(ShopDocument, options);
        }
export type ShopQueryHookResult = ReturnType<typeof useShopQuery>;
export type ShopLazyQueryHookResult = ReturnType<typeof useShopLazyQuery>;
export type ShopQueryResult = Apollo.QueryResult<ShopQuery, ShopQueryVariables>;
export const ShopNameDocument = gql`
    query ShopName($shopId: String) {
  shop(id: $shopId) {
    name
  }
}
    `;

/**
 * __useShopNameQuery__
 *
 * To run a query within a React component, call `useShopNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useShopNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShopNameQuery({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useShopNameQuery(baseOptions?: Apollo.QueryHookOptions<ShopNameQuery, ShopNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShopNameQuery, ShopNameQueryVariables>(ShopNameDocument, options);
      }
export function useShopNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShopNameQuery, ShopNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShopNameQuery, ShopNameQueryVariables>(ShopNameDocument, options);
        }
export type ShopNameQueryHookResult = ReturnType<typeof useShopNameQuery>;
export type ShopNameLazyQueryHookResult = ReturnType<typeof useShopNameLazyQuery>;
export type ShopNameQueryResult = Apollo.QueryResult<ShopNameQuery, ShopNameQueryVariables>;
export const ShopifyqlResponseDocument = gql`
    query ShopifyqlResponse($query: String!, $shopId: String!) {
  shopifyqlResponse(query: $query, shopId: $shopId) {
    tableData {
      rowData
      columns {
        dataType
        displayName
        name
      }
    }
    parseErrors {
      code
      message
      range {
        end {
          line
          character
        }
        start {
          character
          line
        }
      }
    }
  }
}
    `;

/**
 * __useShopifyqlResponseQuery__
 *
 * To run a query within a React component, call `useShopifyqlResponseQuery` and pass it any options that fit your needs.
 * When your component renders, `useShopifyqlResponseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShopifyqlResponseQuery({
 *   variables: {
 *      query: // value for 'query'
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useShopifyqlResponseQuery(baseOptions: Apollo.QueryHookOptions<ShopifyqlResponseQuery, ShopifyqlResponseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShopifyqlResponseQuery, ShopifyqlResponseQueryVariables>(ShopifyqlResponseDocument, options);
      }
export function useShopifyqlResponseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShopifyqlResponseQuery, ShopifyqlResponseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShopifyqlResponseQuery, ShopifyqlResponseQueryVariables>(ShopifyqlResponseDocument, options);
        }
export type ShopifyqlResponseQueryHookResult = ReturnType<typeof useShopifyqlResponseQuery>;
export type ShopifyqlResponseLazyQueryHookResult = ReturnType<typeof useShopifyqlResponseLazyQuery>;
export type ShopifyqlResponseQueryResult = Apollo.QueryResult<ShopifyqlResponseQuery, ShopifyqlResponseQueryVariables>;
export const CreateSubProductDocument = gql`
    mutation CreateSubProduct($productInputId: String!) {
  createSubProduct(productInputId: $productInputId) {
    id_
  }
}
    `;
export type CreateSubProductMutationFn = Apollo.MutationFunction<CreateSubProductMutation, CreateSubProductMutationVariables>;

/**
 * __useCreateSubProductMutation__
 *
 * To run a mutation, you first call `useCreateSubProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubProductMutation, { data, loading, error }] = useCreateSubProductMutation({
 *   variables: {
 *      productInputId: // value for 'productInputId'
 *   },
 * });
 */
export function useCreateSubProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubProductMutation, CreateSubProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubProductMutation, CreateSubProductMutationVariables>(CreateSubProductDocument, options);
      }
export type CreateSubProductMutationHookResult = ReturnType<typeof useCreateSubProductMutation>;
export type CreateSubProductMutationResult = Apollo.MutationResult<CreateSubProductMutation>;
export type CreateSubProductMutationOptions = Apollo.BaseMutationOptions<CreateSubProductMutation, CreateSubProductMutationVariables>;
export const SubProductsDocument = gql`
    query SubProducts($productInputId: String!, $skip: Int, $take: Int) {
  subProducts(productInputId: $productInputId, skip: $skip, take: $take) {
    nodes {
      id_
      customProductType
      descriptionHtml
      giftCard
      handle
      images {
        id_
        altText
        src
      }
      options
      productType
      requiresSellingPlan
      seo {
        id_
        description
        title
      }
      standardizedProductType {
        id_
        productTaxonomyNodeId
      }
      status
      tags
      templateSuffix
      title
      variants {
        id_
        barcode
        compareAtPrice
        fulfillmentServiceId
        harmonizedSystemCode
        imageId
        imageSrc
        inventoryItem {
          id_
          cost
          tracked
        }
        inventoryManagement
        inventoryPolicy
        inventoryQuantities {
          id_
          availableQuantity
          locationId
        }
        mediaSrc
        options
        price
        productId
        requiresShipping
        sku
        taxCode
        taxable
        title
        weight
        weightUnit
      }
      vendor
    }
    total
  }
}
    `;

/**
 * __useSubProductsQuery__
 *
 * To run a query within a React component, call `useSubProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubProductsQuery({
 *   variables: {
 *      productInputId: // value for 'productInputId'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSubProductsQuery(baseOptions: Apollo.QueryHookOptions<SubProductsQuery, SubProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubProductsQuery, SubProductsQueryVariables>(SubProductsDocument, options);
      }
export function useSubProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubProductsQuery, SubProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubProductsQuery, SubProductsQueryVariables>(SubProductsDocument, options);
        }
export type SubProductsQueryHookResult = ReturnType<typeof useSubProductsQuery>;
export type SubProductsLazyQueryHookResult = ReturnType<typeof useSubProductsLazyQuery>;
export type SubProductsQueryResult = Apollo.QueryResult<SubProductsQuery, SubProductsQueryVariables>;