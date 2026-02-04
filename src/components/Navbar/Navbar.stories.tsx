import type { Meta, StoryObj } from "storybook-solidjs-vite";
import User from "lucide-solid/icons/user";
import Settings from "lucide-solid/icons/settings";
import LogOut from "lucide-solid/icons/log-out";
import DrawOpen from "lucide-solid/icons/panel-left-open";
import DrawClose from "lucide-solid/icons/panel-left-close";
import Activity from "lucide-solid/icons/activity";
import Ambulance from "lucide-solid/icons/ambulance";
import ThumbsDown from "lucide-solid/icons/thumbs-down";

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

const meta: Meta<typeof Navbar> = {
  title: "Full examples",
  component: Navbar,
};
export default meta;
type Story = StoryObj<typeof Navbar>;

const linkClass = "justify-between";

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
            <Card>Content</Card>
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
          <Container>
            <Card>{/* <Kanban /> */}</Card>
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
