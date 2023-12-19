import { message as notif } from "antd";

import type { IMessage } from "./interface";

export function message({ content, type }: IMessage) {
  notif.config({ maxCount: 2 });
  notif.open({
    type: type || "success",
    content,
    key: content,
    onClick: () => notif.destroy(content),
  });
}
