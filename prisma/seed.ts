// =============================================================================
// Database Seed Script
// =============================================================================
// Production Readiness:
// - Creates initial admin user (from ADMIN_EMAIL / ADMIN_PASSWORD env vars).
// - Creates default business settings if missing.
// - NEVER seeds sample bikes in production mode (NODE_ENV === 'production').
// Run with: npx prisma db seed
// =============================================================================

import { PrismaClient, FuelType, Transmission, BikeCondition, OwnerNumber } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const isProduction = process.env.NODE_ENV === "production";
  console.log(`🌱 Starting database seed (Environment: ${process.env.NODE_ENV || "development"})...\n`);

  // ─── 1. Seed Admin User ──────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "JSR Admin";

  if (isProduction && (!adminEmail || !adminPassword)) {
    throw new Error("❌ Production seeding error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.");
  }

  const emailToUse = adminEmail || "admin@jsrbikepoint.com";
  const passwordToUse = adminPassword || "admin123";

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: emailToUse },
  });

  if (existingAdmin) {
    const hashedPassword = await hash(passwordToUse, 12);
    await prisma.adminUser.update({
      where: { email: emailToUse },
      data: { hashedPassword, name: adminName },
    });
    console.log(`✓ Admin user password updated for: ${emailToUse}`);
  } else {
    const hashedPassword = await hash(passwordToUse, 12);
    await prisma.adminUser.create({
      data: {
        email: emailToUse,
        hashedPassword,
        name: adminName,
      },
    });
    console.log(`✓ Admin user created: ${emailToUse}`);
  }

  // ─── 2. Seed Business Settings ───────────────────────────────────────
  const existingSettings = await prisma.settings.findFirst();

  if (existingSettings) {
    console.log("✓ Business settings already exist.");
  } else {
    await prisma.settings.create({
      data: {
        businessName: "Jay Shree Ram Bike Point",
        phone: "+919934212567",
        whatsapp: "+919934212567",
        address: "Gobarsahi Chowk, Muzaffarpur, Bihar, 842001",
        openingHours: "Mon - Sat: 9:00 AM - 7:30 PM, Sun: Closed",
        googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8762744365775!2d85.35824587630455!3d26.11540197713217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed10e75a6c11b1%3A0x6b8fbd86bd56549c!2sGobarsahi%20Chowk!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        facebook: "https://facebook.com/jsrbikepoint",
        instagram: "https://instagram.com/jsrbikepoint",
      },
    });
    console.log("✓ Business settings created with Gobarsahi Chowk address.");
  }

  // ─── 3. Sample Bikes (Strictly skipped in production) ─────────────────
  if (isProduction) {
    console.log("🛡️ Production environment detected: Skipping sample bike seeding.");
  } else {
    const bikeCount = await prisma.bike.count();
    if (bikeCount > 0) {
      console.log(`✓ Database already has ${bikeCount} bikes. Skipping sample bike seeding.`);
    } else {
      console.log("⏳ Seeding sample bikes for development...");
      const sampleBikes = [
        {
          slug: "2022-honda-shine-black",
          brand: "Honda",
          model: "CB Shine",
          year: 2022,
          price: 68000,
          engineCC: 125,
          odometer: 14200,
          fuelType: FuelType.PETROL,
          transmission: Transmission.MANUAL,
          condition: BikeCondition.EXCELLENT,
          ownerNumber: OwnerNumber.FIRST,
          colour: "Black",
          registrationNumber: "BR 06 AB 1234",
          description: "Excellent condition Honda Shine. Sparingly used by a single owner. Engine is super smooth and gives great mileage (~55 km/l). All documents are complete and tax is paid till date.",
          features: ["Self Start", "Alloy Wheels", "Disk Brake", "Tubeless Tyres"],
          isSold: false,
          isFeatured: true,
          rcAvailable: true,
          insuranceAvailable: true,
          taxPaid: true,
          images: {
            create: [
              {
                publicId: "placeholder_shine_1",
                url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
                order: 0,
              },
              {
                publicId: "placeholder_shine_2",
                url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
                order: 1,
              }
            ]
          }
        },
        {
          slug: "2020-royal-enfield-classic-350-gunmetal-grey",
          brand: "Royal Enfield",
          model: "Classic 350",
          year: 2020,
          price: 165000,
          engineCC: 346,
          odometer: 28000,
          fuelType: FuelType.PETROL,
          transmission: Transmission.MANUAL,
          condition: BikeCondition.VERY_GOOD,
          ownerNumber: OwnerNumber.FIRST,
          colour: "Gunmetal Grey",
          registrationNumber: "BR 05 CD 5678",
          description: "Royal Enfield Classic 350 in premium Gunmetal Grey. Features dual-channel ABS and alloy wheels. Serviced regularly at authorized centers. Dual seat setup with original tank pads installed.",
          features: ["Electric Start", "Alloy Wheels", "Dual Channel ABS", "LED Indicators", "Crash Guard"],
          isSold: false,
          isFeatured: true,
          rcAvailable: true,
          insuranceAvailable: true,
          taxPaid: true,
          images: {
            create: [
              {
                publicId: "placeholder_re_1",
                url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
                order: 0,
              }
            ]
          }
        },
        {
          slug: "2021-hero-splendor-plus-silver",
          brand: "Hero",
          model: "Splendor Plus i3S",
          year: 2021,
          price: 52000,
          engineCC: 97,
          odometer: 18500,
          fuelType: FuelType.PETROL,
          transmission: Transmission.MANUAL,
          condition: BikeCondition.GOOD,
          ownerNumber: OwnerNumber.SECOND,
          colour: "Silver",
          registrationNumber: "BR 06 XY 9876",
          description: "Reliable Hero Splendor Plus with i3S technology. Extremely fuel-efficient commuter bike. New rear tyre installed. Perfect choice for daily city commute in Muzaffarpur.",
          features: ["i3S Tech", "Self Start", "Alloy Wheels", "Side Stand Indicator"],
          isSold: false,
          isFeatured: false,
          rcAvailable: true,
          insuranceAvailable: false,
          taxPaid: true,
          images: {
            create: [
              {
                publicId: "placeholder_splendor_1",
                url: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800",
                order: 0,
              }
            ]
          }
        }
      ];

      for (const bike of sampleBikes) {
        await prisma.bike.create({
          data: bike,
        });
      }

      console.log("✓ Successfully seeded sample bikes for development.");
    }
  }

  console.log("\n✅ Seed process finished successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
