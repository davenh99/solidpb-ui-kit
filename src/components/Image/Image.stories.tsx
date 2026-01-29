import { Image } from "./Image";
import { createSignal } from "solid-js";

export default {
  title: "Components/Image",
  component: Image,
};

export const Default = () => (
  <Image src="https://placehold.co/200x200" alt="Default image" style={{ width: "200px", height: "200px" }} />
);

export const Editable = () => {
  const [file, setFile] = createSignal<File | null>(null);
  return (
    <Image
      src={file() ? URL.createObjectURL(file()!) : "https://placehold.co/200x200"}
      alt="Editable image"
      editable
      onChange={setFile}
      style={{ width: "200px", height: "200px" }}
    />
  );
};

export const Sizes = () => (
  <div class="flex gap-4">
    <Image src="https://placehold.co/64x64" alt="Extra Small" size="xs" />
    <Image src="https://placehold.co/96x96" alt="Small" size="sm" />
    <Image src="https://placehold.co/128x128" alt="Medium" size="md" />
    <Image src="https://placehold.co/192x192" alt="Large" size="lg" />
    <Image src="https://placehold.co/64x64" alt="Extra Large" size="xl" />
  </div>
);
