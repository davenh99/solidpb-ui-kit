import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Tabs } from "./Tabs";
import Chart from "lucide-solid/icons/chart-area";
import { ProductForm, productData } from "../Form/Form.stories";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const tabs = [
  {
    value: "tab1",
    trigger: "Tab 1",
    content: "Content for Tab 1",
  },
  {
    value: "tab2",
    trigger: "Tab 2",
    content: "Content for Tab 2",
  },
  {
    value: "tab3",
    trigger: (
      <span class="flex items-center gap-1">
        <Chart /> hello
      </span>
    ),
    content: (
      <ProductForm data={productData}>
        <ProductForm.ImageField field="imageUrl" label="Product Image" size="lg" />
        <ProductForm.TextField field="name" label="Name" />
        <ProductForm.NumberField
          field="price"
          label="Price"
          inputProps={{ class: "w-40" }}
          formatOptions={{ style: "currency", currency: "AUD" }}
        />
        <ProductForm.CheckboxField field="inStock" label="In Stock" />
      </ProductForm>
    ),
  },
];

export const Default: Story = {
  render: () => {
    return <Tabs tabs={tabs} />;
  },
};
