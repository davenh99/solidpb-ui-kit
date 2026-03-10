import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../components/Form";
import { Container } from "../components/Container";
import { Card } from "../components/Card";
import { createSignal } from "solid-js";
import { RelationPicker } from "../components/RelationPicker";
import { Button } from "../components/Button";

const tags = [
  { id: "1", name: "Tag 1" },
  { id: "2", name: "Tag 2" },
  { id: "3", name: "Tag 3" },
  { id: "4", name: "Tag 4" },
  { id: "5", name: "Tag 5" },
  { id: "6", name: "Tag 6" },
  // need like 50 to see the scroll in action
  { id: "7", name: "Tag 7" },
  { id: "8", name: "Tag 8" },
  { id: "9", name: "Tag 9" },
  { id: "10", name: "Tag 10" },
  { id: "11", name: "Tag 11" },
  { id: "12", name: "Tag 12" },
  { id: "13", name: "Tag 13" },
  { id: "14", name: "Tag 14" },
  { id: "15", name: "Tag 15" },
  { id: "16", name: "Tag 16" },
  { id: "17", name: "Tag 17" },
  { id: "18", name: "Tag 18" },
  { id: "19", name: "Tag 19" },
  { id: "20", name: "Tag 20" },
  { id: "21", name: "No records found", disabled: true },
];

export interface MockProduct {
  name: string;
  price: number;
  inStock: boolean;
  category: "electronics" | "clothing" | "books";
  sellable: boolean;
  description: string;
  percentageDiscount: number;
  imageUrl?: string;
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
  imageUrl: undefined,
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
    const [selected, setSelected] = createSignal<{ label: string; value: string } | null>(null);
    const [data, setData] = createSignal<Partial<MockProduct>>(productData);
    const [chosenTags, setChosenTags] = createSignal<typeof tags>([]);
    const [chosenTag, setChosenTag] = createSignal<typeof tags>([]);

    return (
      <Container class="bg-base-200 flex items-center justify-center">
        <Card class="min-w-150">
          <ProductForm
            data={data()}
            setData={setData}
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
            <RelationPicker
              valueKey="id"
              labelKey="name"
              options={tags}
              value={chosenTags()}
              onChange={setChosenTags}
              multi
              label="multi tags!"
              placeholder="search records"
            />
            <RelationPicker
              valueKey="id"
              labelKey="name"
              disabledKey="disabled"
              options={tags}
              value={chosenTag()}
              onChange={setChosenTag}
              label="Choose tag"
              variant="ghost"
              placeholder="search records"
              listboxAction={
                <div class="px-1.25 pb-1.25">
                  <Button appearance="neutral" variant="ghost" modifier="block" onClick={() => {}}>
                    More
                  </Button>
                </div>
              }
              defaultFilter={() => true}
            />
          </ProductForm>
        </Card>
      </Container>
    );
  },
};
