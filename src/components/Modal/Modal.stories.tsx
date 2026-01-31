import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Modal, useModal } from "./Modal";
import { ProductForm, productData } from "../Form/Form.stories";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
};
export default meta;
type Story = StoryObj<typeof Modal>;

const ProdForm = () => {
  const { setOpen } = useModal();

  return (
    <ProductForm
      data={productData}
      onSave={async (vals) => alert(JSON.stringify(vals))}
      onCancel={() => setOpen(false)}
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
    </ProductForm>
  );
};

export const Default: Story = {
  render: () => (
    <div class="flex flex-col gap-4 w-fit">
      <Modal id="modal-1" title="Example Modal">
        <Modal.Trigger>Open Modal</Modal.Trigger>
        <Modal.Modal>Modal content</Modal.Modal>
      </Modal>
      <Modal id="modal-2" title="Product form">
        <Modal.Trigger>Open product</Modal.Trigger>
        <Modal.Modal>
          <ProdForm />
        </Modal.Modal>
      </Modal>
    </div>
  ),
};
