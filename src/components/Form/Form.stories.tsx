import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "./Form";
import { Container } from "../Container";
import { Card } from "../Card";
import { createSignal } from "solid-js";

export interface MockProduct {
  name: string;
  price: number;
  inStock: boolean;
  category: "electronics" | "clothing" | "books";
  sellable: boolean;
  description: string;
  percentageDiscount: number;
  imageUrl: string;
  file: string;
  id: string;
  collectionId: string;
  tablePosition?: number;
}

export const productData: MockProduct = {
  name: "Sample Product",
  price: 29.99,
  inStock: true,
  category: "electronics",
  sellable: true,
  description: "This is a sample product used for demonstrating the Form component.",
  percentageDiscount: 10,
  imageUrl: "https://placehold.co/128x128",
  file: "data.pdf",
  id: "0",
  collectionId: "0",
};

export const ProductForm = createForm<MockProduct>();

const meta: Meta<typeof ProductForm> = {
  title: "Components/Form",
  component: ProductForm,
};
export default meta;
type Story = StoryObj<typeof ProductForm>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = createSignal<string | undefined>();

    return (
      <Container class="bg-base-200 flex items-center justify-center">
        <Card class="min-w-150">
          <ProductForm
            data={productData}
            title="Edit Product"
            onSave={async (vals) => alert(JSON.stringify(vals))}
          >
            <ProductForm.ImageField field="imageUrl" label="Product Image" size="lg" />
            <ProductForm.TextField field="name" label="Name" />
            <ProductForm.NumberField
              field="price"
              label="Price"
              inputProps={{ class: "w-40" }}
              formatOptions={{ style: "currency", currency: "AUD" }}
            />
            <ProductForm.CheckboxField field="inStock" label="In Stock" />
            <ProductForm.SelectField
              field="category"
              label="Category"
              onChange={setSelected}
              value={selected()}
              options={[
                { label: "Electronics", value: "electronics" },
                { label: "Clothing", value: "clothing" },
                { label: "Books", value: "books" },
              ]}
            />
            <ProductForm.TextAreaField
              field="description"
              label="Description"
              textareaProps={{ autoResize: true }}
            />
            <ProductForm.SwitchField field="sellable" label="Sellable" />
            <ProductForm.SliderField field="percentageDiscount" min={0} max={100} label="random slider" />
            <ProductForm.FileField field="file" label="Product data" />
          </ProductForm>
        </Card>
      </Container>
    );
  },
};
