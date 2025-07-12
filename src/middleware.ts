// middleware.ts

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  // هذه الدالة يمكن أن تظل فارغة إذا لم تكن بحاجة لمنطق مخصص داخل الوسيط
  async function middleware(request: NextRequest) {
    // يمكنك إضافة أي منطق تريده هنا
  },
  {
    // هذه الإعدادات تضمن أن المستخدم غير المسجل يتم إعادته إلى صفحة الدخول
    isReturnToCurrentPage: true,
    redirectTo: "/login",
  }
);

export const config = {
  // هذا الـ matcher الجديد سيحمي كل المسارات ما عدا المسارات العامة والخاصة بـ Next.js
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|images).*)"],
};
