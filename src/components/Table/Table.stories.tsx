import { createMemo, createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ColumnDef } from "@tanstack/solid-table";
import { toaster } from "@kobalte/core/toast";

import { Table } from "./Table";
import { Image } from "../Image";
import { Tabs } from "../Tabs";
import { Toast, Toaster } from "../Toast";
import { Container } from "../Container";
import { MockProduct } from "../Form/Form.stories";
import { NumberInput } from "../NumberInput";
import { Checkbox } from "../Checkbox";
import { Switch } from "../Switch";
import { Pagination } from "../Pagination";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
};
export default meta;
type Story = StoryObj<typeof Table>;

export const tableData: MockProduct[] = [
  {
    name: "Apple iPhone 15",
    price: 999,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Latest Apple smartphone with A17 chip",
    percentageDiscount: 10,
    imageUrl: "https://images.unsplash.com/photo-1592286927505-1fed6c3d8efd?w=400",
    file: "iphone-15.pdf",
    id: "1",
    collectionId: "0",
    tablePosition: 0,
  },
  {
    name: "Samsung Galaxy S24",
    price: 899,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Flagship Android phone with AMOLED display",
    percentageDiscount: 5,
    imageUrl: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400",
    file: "galaxy-s24.pdf",
    id: "2",
    collectionId: "0",
    tablePosition: 1,
  },
  {
    name: "Sony WH-1000XM5",
    price: 399,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Noise-cancelling wireless headphones",
    percentageDiscount: 15,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    file: "sony-headphones.pdf",
    id: "3",
    collectionId: "0",
    tablePosition: 2,
  },
  {
    name: "Dell XPS 13",
    price: 1299,
    inStock: false,
    category: "electronics",
    sellable: false,
    description: "Ultra-portable laptop with 13-inch display",
    percentageDiscount: 0,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
    file: "dell-xps.pdf",
    id: "4",
    collectionId: "0",
    tablePosition: 3,
  },
  {
    name: "Nintendo Switch OLED",
    price: 349,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Handheld gaming console with OLED screen",
    percentageDiscount: 8,
    imageUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400",
    file: "switch-oled.pdf",
    id: "5",
    collectionId: "0",
    tablePosition: 4,
  },
  {
    name: "Fitbit Charge 6",
    price: 159,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Fitness tracker with heart rate monitor",
    percentageDiscount: 12,
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    file: "fitbit-charge.pdf",
    id: "6",
    collectionId: "0",
    tablePosition: 5,
  },
  {
    name: "Canon EOS R7",
    price: 1499,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Mirrorless camera for enthusiasts",
    percentageDiscount: 20,
    imageUrl: "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400",
    file: "canon-r7.pdf",
    id: "7",
    collectionId: "0",
    tablePosition: 6,
  },
  {
    name: "Apple Watch Series 9",
    price: 429,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Smartwatch with health tracking",
    percentageDiscount: 7,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    file: "apple-watch-9.pdf",
    id: "8",
    collectionId: "0",
    tablePosition: 7,
  },
  {
    name: "Google Pixel Buds Pro",
    price: 199,
    inStock: false,
    category: "electronics",
    sellable: false,
    description: "Wireless earbuds with ANC",
    percentageDiscount: 0,
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
    file: "pixel-buds.pdf",
    id: "9",
    collectionId: "0",
    tablePosition: 8,
  },
  {
    name: "Anker PowerCore 20000",
    price: 45,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "High-capacity portable charger",
    percentageDiscount: 25,
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
    file: "anker-powercore.pdf",
    id: "10",
    collectionId: "0",
    tablePosition: 9,
  },
];

const columns: ColumnDef<MockProduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (ctx) => (
      <NumberInput
        variant="ghost"
        rawValue={ctx.getValue<number>()}
        formatOptions={{ style: "currency", currency: "AUD" }}
        class="w-25"
      />
    ),
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
    cell: (ctx) => <Checkbox checked={ctx.getValue<boolean>()} disabled appearance="neutral" />,
  },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "sellable",
    header: "Sellable",
    cell: (ctx) => <Switch checked={ctx.getValue<boolean>()} disabled appearance="primary" />,
  },
  {
    accessorKey: "percentageDiscount",
    header: "Discount %",
    cell: (ctx) => <span class="font-bold">{ctx.getValue<number>()}%</span>,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: (ctx) => <Image class="w-10 h-10" src={ctx.getValue<string>()} />,
  },
  {
    accessorKey: "file",
    header: "File",
  },
];

export const Default: Story = {
  render: () => {
    const [data, setData] = createSignal(tableData);
    const perPageOptions = [2, 5, 10];
    const [perPage, setPerPage] = createSignal(2);
    const [page, setPage] = createSignal(0);

    const reorder = (oldInd: number, newInd: number) => {
      const curData = [...data()];
      const [movedItem] = curData.splice(oldInd, 1);
      const adjustedNewInd = newInd > oldInd ? newInd - 1 : newInd;
      curData.splice(adjustedNewInd, 0, movedItem);
      setData(curData);
    };

    const handleNextPage = () => {
      const totalPages = Math.ceil(tableData.length / perPage());
      if (page() < totalPages - 1) {
        setPage(page() + 1);
      }
    };

    const handlePrevPage = () => {
      if (page() > 0) {
        setPage(page() - 1);
      }
    };

    const handlePageChange = (newPage: number) => {
      const totalPages = Math.ceil(tableData.length / perPage());
      if (newPage >= 0 && newPage < totalPages) {
        setPage(newPage);
      }
    };

    const handlePerPageChange = (newPerPage: number) => {
      setPerPage(newPerPage);
      setPage(0);
    };

    const paginatedData = () => {
      const start = page() * perPage();
      return data().slice(start, start + perPage());
    };

    return (
      <Container>
        <Tabs>
          <Tabs.List>
            <Tabs.Trigger value="lst">Table 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="lst">
            <Pagination
              class="self-center mb-2"
              perPage={perPage}
              perPageOptions={perPageOptions}
              page={page}
              size="sm"
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              onPageChange={handlePageChange}
              totalItems={tableData.length}
              onPerPageChange={handlePerPageChange}
            />
            <Table<MockProduct>
              headers
              size="sm"
              columns={createMemo(() => columns)}
              data={paginatedData}
              onRowClick={(r) =>
                toaster.show((props) => (
                  <Toast {...props} title="Item clicked" msg={`You clicked on ${r.name}`} />
                ))
              }
              onReorderRow={reorder}
            />
          </Tabs.Content>
        </Tabs>
        <Toaster />
      </Container>
    );
  },
};
