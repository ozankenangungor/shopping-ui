import { Box, Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../product-image";

interface SingleProductProps {
  params: { productId: string };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const product = await getProduct(+params.productId);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3,
        marginBottom: "2rem"
      }}
    >
      {product.imageExists && (
        <Box>
          <Image
            src={getProductImage(product.id)}
            width={0}
            height={0}
            className="w-full sm:w-3/4 h-auto"
            sizes="100vw"
            alt="Picture of the product"
          />
        </Box>
      )}
      <Stack gap={3}>
        <Typography variant="h2">{product.name}</Typography>
        <Typography>{product.description}</Typography>
        <Typography variant="h4">${product.price}</Typography>
      </Stack>
    </Box>
  );
}
