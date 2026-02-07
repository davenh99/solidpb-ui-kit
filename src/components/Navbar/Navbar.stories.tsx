import type { Meta, StoryObj } from "storybook-solidjs-vite";
import User from "lucide-solid/icons/user";
import Settings from "lucide-solid/icons/settings";
import LogOut from "lucide-solid/icons/log-out";
import DrawOpen from "lucide-solid/icons/panel-left-open";
import DrawClose from "lucide-solid/icons/panel-left-close";
import Activity from "lucide-solid/icons/activity";
import Ambulance from "lucide-solid/icons/ambulance";
import ThumbsDown from "lucide-solid/icons/thumbs-down";
import { ColumnDef } from "@tanstack/solid-table";

import Navbar from "./Navbar";
import { Drawer } from "../Drawer";
import { Container } from "../Container";
import { DropdownMenu } from "../DropdownMenu";
import { Avatar } from "../Avatar";
import { Card } from "../Card";
import { BreadCrumbs } from "../BreadCrumbs";
import { ProductForm, productData } from "../Form/Form.stories";
import { ActivityFeed } from "../ActivityFeed";
import { Kanban } from "../Kanban";
import { defaultColumns, defaultTasks, type Task } from "../Kanban/Kanban.stories";
import { Table } from "../Table";
import { Checkbox } from "../Checkbox";
import { createMemo } from "solid-js";

const meta: Meta<typeof Navbar> = {
  title: "Full examples",
  component: Navbar,
};
export default meta;
type Story = StoryObj<typeof Navbar>;

const linkClass = "justify-between";

interface MockItem {
  name: string;
  description: string;
  sellable: boolean;
  id: string;
  collectionId: string;
}

const columns: ColumnDef<MockItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
    cell: (ctx) => <Checkbox checked={ctx.getValue<boolean>()} appearance="neutral" />,
  },
];

const tableData: MockItem[] = [
  {
    collectionId: "0",
    id: "0",
    name: "Laptop",
    description: "High-performance 15-inch laptop",
    sellable: true,
  },
  { collectionId: "0", id: "0", name: "Mouse", description: "Wireless ergonomic mouse", sellable: true },
  {
    collectionId: "0",
    id: "1",
    name: "Keyboard",
    description: "Mechanical keyboard with RGB lighting",
    sellable: true,
  },
  { collectionId: "0", id: "0", name: "Monitor", description: "27-inch 4K display", sellable: true },
  {
    collectionId: "0",
    id: "2",
    name: "Headphones",
    description: "Noise-canceling Bluetooth headphones",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "3",
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    sellable: true,
  },
  { collectionId: "0", id: "0", name: "USB Hub", description: "7-port USB 3.0 hub", sellable: true },
  { collectionId: "0", id: "0", name: "External SSD", description: "1TB portable SSD", sellable: true },
  {
    collectionId: "0",
    id: "4",
    name: "Cable Kit",
    description: "HDMI, USB-C, and DisplayPort cables",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "5",
    name: "Webcam",
    description: "1080p HD webcam with microphone",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "6",
    name: "Phone Stand",
    description: "Adjustable phone stand for desk",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "7",
    name: "Desk Organizer",
    description: "Multi-compartment desk organizer",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "8",
    name: "Power Bank",
    description: "20000mAh portable charger",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "9",
    name: "Cable Clips",
    description: "Cable management clips (pack of 10)",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "10",
    name: "Screen Protector",
    description: "Anti-glare screen protector",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "11",
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "12",
    name: "Phone Case",
    description: "Protective silicone phone case",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "13",
    name: "Screen Cleaner",
    description: "Microfiber cloth and cleaning solution",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "14",
    name: "Air Purifier",
    description: "Desktop air purifier with HEPA filter",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "15",
    name: "Desk Fan",
    description: "Quiet desktop fan with USB power",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "16",
    name: "Coffee Maker",
    description: "Personal coffee maker for office",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "17",
    name: "Water Bottle",
    description: "Insulated water bottle (32oz)",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "18",
    name: "Notebook",
    description: "Premium leather-bound notebook",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "19",
    name: "Pen Set",
    description: "Set of 5 premium ballpoint pens",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "20",
    name: "Desk Mat",
    description: "Large mousepad and desk mat",
    sellable: true,
  },
  { collectionId: "0", id: "21", name: "Speaker", description: "Portable Bluetooth speaker", sellable: true },
  {
    collectionId: "0",
    id: "22",
    name: "Docking Station",
    description: "USB-C docking station for laptops",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "23",
    name: "Monitor Light",
    description: "Monitor glow light bar",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "24",
    name: "Cooling Pad",
    description: "Laptop cooling pad with dual fans",
    sellable: true,
  },
  {
    collectionId: "0",
    id: "25",
    name: "Desk Shelf",
    description: "Floating shelf for desk organization",
    sellable: true,
  },
];

export const TablePageWithNavbar: Story = {
  render: () => {
    return (
      <Drawer id="drawer-2">
        <Drawer.Content>
          <Navbar>
            <div class="flex items-center">
              <Drawer.Trigger class="btn btn-ghost btn-square btn-sm lg:hidden">
                <DrawOpen size="24" />
              </Drawer.Trigger>
              <Navbar.Brand>
                <a>My App</a>
              </Navbar.Brand>
              <Navbar.Menu>
                <Navbar.MenuItem>
                  <a>Configuration</a>
                </Navbar.MenuItem>
                <Navbar.MenuItem>
                  <Navbar.Submenu title="Settings">
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 1</a>
                    </Navbar.MenuItem>
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 2</a>
                    </Navbar.MenuItem>
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 3</a>
                    </Navbar.MenuItem>
                  </Navbar.Submenu>
                </Navbar.MenuItem>
                <Navbar.MenuItem>
                  <a>Data</a>
                </Navbar.MenuItem>
              </Navbar.Menu>
            </div>
            <Navbar.Profile>
              <DropdownMenu>
                <DropdownMenu.Trigger>
                  <Avatar fallback="DH" alt="Placeholder" size="md" class="btn btn-round" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="sm" class="min-w-50">
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Profile</span> <User size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Settings</span> <Settings size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Logout</span> <LogOut size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                </DropdownMenu.Content>
              </DropdownMenu>
            </Navbar.Profile>
          </Navbar>
          <Container>
            <Card>
              <Table<MockItem>
                headers
                columns={createMemo(() => columns)}
                data={createMemo(() => tableData)()}
                onRowClick={(r) => {}}
                size="xs"
              />
            </Card>
          </Container>
        </Drawer.Content>
        <Drawer.Drawer>
          <Drawer.Trigger class="btn btn-ghost btn-square btn-sm hidden lg:flex mx-2 mt-2 w-12">
            <DrawOpen size="24" class="is-drawer-open:hidden" />
            <DrawClose size="24" class="is-drawer-close:hidden" />
          </Drawer.Trigger>
          <Drawer.Menu>
            <Drawer.MenuItem icon={<Activity />} label="Item 1" />
            <Drawer.MenuItem icon={<Ambulance />} label="Item 2" />
            <Drawer.MenuItem icon={<ThumbsDown />} label="Item 3" />
          </Drawer.Menu>
        </Drawer.Drawer>
      </Drawer>
    );
  },
};

export const FormPageWithActivityFeed: Story = {
  render: () => {
    return (
      <Drawer id="drawer-2">
        <Drawer.Content>
          <Navbar>
            <div class="flex items-center">
              <Drawer.Trigger class="btn btn-ghost btn-square btn-sm lg:hidden">
                <DrawOpen size="24" />
              </Drawer.Trigger>
              <Navbar.Brand>
                <a>My App</a>
              </Navbar.Brand>
              <Navbar.Menu>
                <Navbar.MenuItem>
                  <a>Configuration</a>
                </Navbar.MenuItem>
                <Navbar.MenuItem>
                  <Navbar.Submenu title="Settings">
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 1</a>
                    </Navbar.MenuItem>
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 2</a>
                    </Navbar.MenuItem>
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 3</a>
                    </Navbar.MenuItem>
                  </Navbar.Submenu>
                </Navbar.MenuItem>
                <Navbar.MenuItem>
                  <a>Data</a>
                </Navbar.MenuItem>
              </Navbar.Menu>
            </div>
            <Navbar.Profile>
              <DropdownMenu>
                <DropdownMenu.Trigger>
                  <Avatar fallback="DH" alt="Placeholder" size="md" class="btn btn-round" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="sm" class="min-w-50">
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Profile</span> <User size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Settings</span> <Settings size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Logout</span> <LogOut size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                </DropdownMenu.Content>
              </DropdownMenu>
            </Navbar.Profile>
          </Navbar>
          <div class="flex">
            <Container>
              <BreadCrumbs items={[{ label: "Products", onClick: () => {} }, { label: "robot" }]} />
              <Card>
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
              </Card>
            </Container>
            <ActivityFeed
              username="John Doe"
              profileUrl="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              feed={[
                {
                  username: "John Doe",
                  profileUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
                  message: "Just shared a new project update!",
                  timeStamp: "12:45 PM",
                },
                {
                  username: "Jane Smith",
                  profileUrl: "https://img.daisyui.com/images/stock/photo-1534890812127-a8ba63d9d3ab.webp",
                  message: "Thanks for the feedback on the design!",
                  timeStamp: "1:20 PM",
                },
                {
                  username: "Mike Johnson",
                  profileUrl: "https://img.daisyui.com/images/stock/photo-1535713624532-430d66e9e0e5.webp",
                  message: "Working on the new features for next release.",
                  timeStamp: "2:15 PM",
                },
              ]}
            />
          </div>
        </Drawer.Content>
        <Drawer.Drawer>
          <Drawer.Trigger class="btn btn-ghost btn-square btn-sm hidden lg:flex mx-2 mt-2 w-12">
            <DrawOpen size="24" class="is-drawer-open:hidden" />
            <DrawClose size="24" class="is-drawer-close:hidden" />
          </Drawer.Trigger>
          <Drawer.Menu>
            <Drawer.MenuItem icon={<Activity />} label="Item 1" />
            <Drawer.MenuItem icon={<Ambulance />} label="Item 2" />
            <Drawer.MenuItem icon={<ThumbsDown />} label="Item 3" />
          </Drawer.Menu>
        </Drawer.Drawer>
      </Drawer>
    );
  },
};

export const KanbanPageWithNavbar: Story = {
  render: () => {
    return (
      <Drawer id="drawer-2">
        <Drawer.Content>
          <Navbar>
            <div class="flex items-center">
              <Drawer.Trigger class="btn btn-ghost btn-square btn-sm lg:hidden">
                <DrawOpen size="24" />
              </Drawer.Trigger>
              <Navbar.Brand>
                <a>My App</a>
              </Navbar.Brand>
              <Navbar.Menu>
                <Navbar.MenuItem>
                  <a>Configuration</a>
                </Navbar.MenuItem>
                <Navbar.MenuItem>
                  <Navbar.Submenu title="Settings">
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 1</a>
                    </Navbar.MenuItem>
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 2</a>
                    </Navbar.MenuItem>
                    <Navbar.MenuItem>
                      <a class="text-nowrap">Setting 3</a>
                    </Navbar.MenuItem>
                  </Navbar.Submenu>
                </Navbar.MenuItem>
                <Navbar.MenuItem>
                  <a>Data</a>
                </Navbar.MenuItem>
              </Navbar.Menu>
            </div>
            <Navbar.Profile>
              <DropdownMenu>
                <DropdownMenu.Trigger>
                  <Avatar fallback="DH" alt="Placeholder" size="md" class="btn btn-round" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="sm" class="min-w-50">
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Profile</span> <User size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Settings</span> <Settings size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                  <DropdownMenu.MenuItem onSelect={() => {}}>
                    <a class={linkClass}>
                      <span>Logout</span> <LogOut size="16" />
                    </a>
                  </DropdownMenu.MenuItem>
                </DropdownMenu.Content>
              </DropdownMenu>
            </Navbar.Profile>
          </Navbar>
          <Container class="bg-base-200">
            <Kanban<Task, KanbanState> items={defaultTasks} columns={defaultColumns} />
          </Container>
        </Drawer.Content>
        <Drawer.Drawer>
          <Drawer.Trigger class="btn btn-ghost btn-square btn-sm hidden lg:flex mx-2 mt-2 w-12">
            <DrawOpen size="24" class="is-drawer-open:hidden" />
            <DrawClose size="24" class="is-drawer-close:hidden" />
          </Drawer.Trigger>
          <Drawer.Menu>
            <Drawer.MenuItem icon={<Activity />} label="Item 1" />
            <Drawer.MenuItem icon={<Ambulance />} label="Item 2" />
            <Drawer.MenuItem icon={<ThumbsDown />} label="Item 3" />
          </Drawer.Menu>
        </Drawer.Drawer>
      </Drawer>
    );
  },
};
