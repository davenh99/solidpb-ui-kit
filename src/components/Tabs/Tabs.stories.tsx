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

export const Default: Story = {
  render: () => {
    return (
      <Tabs>
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">
            <span class="flex items-center gap-1">
              <Chart /> hello
            </span>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
        <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
        <Tabs.Content value="tab3">
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
        </Tabs.Content>
      </Tabs>
    );
  },
};
