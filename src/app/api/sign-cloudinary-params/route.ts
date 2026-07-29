// =============================================================================
// Cloudinary Signature Endpoint
// =============================================================================
// Generates signed upload parameters for the Cloudinary Upload Widget.
// This endpoint MUST be server-side to keep CLOUDINARY_API_SECRET secure.
// =============================================================================

import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function POST(request: Request): Promise<Response> {
  // Only authenticated admin users can upload images
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, string>;
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json(
        { error: "Missing paramsToSign" },
        { status: 400 }
      );
    }

    const signature = cloudinary.utils.api_sign_request(
      JSON.parse(paramsToSign) as Record<string, string>,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Cloudinary signature error:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
