import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "./Form";
import { Container } from "../Container";
import { Card } from "../Card";

interface MockProduct {
  name: string;
  price: number;
  inStock: boolean;
  category: "electronics" | "clothing" | "books";
  sellable: boolean;
}

const productData: MockProduct = {
  name: "Sample Product",
  price: 29.99,
  inStock: true,
  category: "electronics",
  sellable: true,
};

const ProductForm = createForm<MockProduct>();

const meta: Meta<typeof ProductForm> = {
  title: "Components/Form",
  component: ProductForm,
};
export default meta;
type Story = StoryObj<typeof ProductForm>;

export const Default: Story = {
  render: () => (
    <Container class="bg-base-200 flex items-center justify-center">
      <Card class="min-w-120">
        <ProductForm
          data={productData}
          title="Edit Product"
          saveFunc={async (vals) => alert(JSON.stringify(vals))}
        >
          <ProductForm.Field field="name" label="Name" widget="text" />
          <ProductForm.NumberField field="price" label="Price" class="w-50" />
          <ProductForm.Field field="inStock" label="In Stock" widget="checkbox" />
          {/* <ProductForm.Field
        field="category"
        label="Category"
        widget="select"
        selectOptions={[
          { label: "Electronics", value: "electronics" },
          { label: "Clothing", value: "clothing" },
          { label: "Books", value: "books" },
        ]}
      /> */}
          <ProductForm.Field field="sellable" label="Sellable" widget="switch" />
        </ProductForm>
      </Card>
    </Container>
  ),
};
