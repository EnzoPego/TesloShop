"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verificar sesión de ususario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }
  // console.log({ productIds, address, userId })

  // Obtener información de los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });
  //console.log({products})

  // Calcular los montos // Encabezado

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
  //console.log({itemsInOrder})

  // Los totales de tax, subtotal y total

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subtotal = product.price * productQuantity;

      totals.subTotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );
  //console.log({subTotal, tax, total})

  // Crear la transacción de base de datos

  const prismaTx = await prisma.$transaction(async (tx) => {
    // 1 Actualizar el stock de los productos

    // 2 Crear la orden - Encabezado - Detalles
    const order = await tx.order.create({
      data: {
        userId: userId,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        tax: tax,
        total: total,

        OrderItem: {
          createMany: {
            data: productIds.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find((product) => product.id === p.productId)?.price ?? 0,
            })),
          },
        },
      },
    });

    // Validar, si el price es cero, entonces,lanzar un error
    //Address
    const { country, ...restAddress } = address;
    const orderAddress = await tx.orderAddress.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order.id,     
      },
    });

    return {
      updatedProducts: [],
      order: order,
      orderAddress: orderAddress,
    };
  });
};
