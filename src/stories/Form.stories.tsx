import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createForm } from "../components/Form";
import { Container } from "../components/Container";
import { Card } from "../components/Card";
import { createSignal } from "solid-js";
import { Button } from "../components/Button";

const tags = [
  { id: "1", name: "Tag 1" },
  { id: "2", name: "Tag 2" },
  { id: "3", name: "Tag 3" },
  { id: "4", name: "Tag 4" },
  { id: "5", name: "Tag 5" },
  { id: "6", name: "Tag 6" },
  { id: "20", name: "Tag 20", disabled: false },
];

const parentOptions = [
  { id: "1", name: "Parent 1" },
  { id: "2", name: "Parent 2" },
  { id: "3", name: "Parent 3" },
  { id: "4", name: "Parent 4" },
  { id: "5", name: "Parent 5" },
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
  tags?: string[];
  parentId?: string;
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
  tags: [],
  parentId: undefined,
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
    // we need this, as when updating the data it will change to a blob, but we still want the url to show in the image field
    // const [imageUrl, setImageUrl] = createSignal<string | undefined>(productData.imageUrl);
    const [file, setFile] = createSignal<string | undefined>(productData.file);
    const [chosenTags, setChosenTags] = createSignal<typeof tags>([]);
    const [parentOption, setParentOption] = createSignal<(typeof parentOptions)[0] | null>(null);

    return (
      <Container class="bg-base-200 flex items-center justify-center">
        <Card class="min-w-150">
          <ProductForm data={productData} title="Edit Product" onSave={async (vals) => console.log(vals)}>
            <ProductForm.ImageField
              field="imageUrl"
              label="Product Image"
              size="lg"
              src={productData.imageUrl}
              // temporary url for viewing. the blob is stored in data for when we want to save.
              // not needed!
              // onChange={(file) => setImageUrl(file ? URL.createObjectURL(file) : undefined)}
            />
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
            <ProductForm.RelationField
              field="tags"
              valueKey="id"
              labelKey="name"
              options={tags}
              value={chosenTags()}
              onChange={setChosenTags}
              multi
              label="multi tags!"
              placeholder="search records"
            />
            <ProductForm.RelationField
              field="parentId"
              valueKey="id"
              labelKey="name"
              options={parentOptions}
              value={parentOption()}
              onChange={setParentOption}
              label="Choose parent"
              placeholder="search records"
              listboxAction={
                <div class="px-1.25 pb-1.25">
                  <Button appearance="neutral" variant="ghost" modifier="block" onClick={() => {}}>
                    More
                  </Button>
                </div>
              }
              defaultFilter={() => true}
              onLinkClick={(item) => alert(`Could navigate to ${item.name}`)}
            />
          </ProductForm>
        </Card>
      </Container>
    );
  },
};
