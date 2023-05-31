import { QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect, useContext } from "react";
import { Card, Image, Text, Badge, Button, Group, Modal, Grid, TextInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { fetchCategory } from "../../api/index";

const queryClient = new QueryClient();
export function ListCategory() {
    return (
        <QueryClientProvider client={queryClient}>
        <CategoryPage />
        </QueryClientProvider>
    );
}

function CategoryPage(){

    const [category, setCategory]=React.useState([]);
    const reloadCategory = async()=>{
        console.log('reloadCategory')
        const data = await fetchCategory();
        setCategory(data)
    }
    useEffect(()=>{
        document.title = "Category";
        reloadCategory();
        console.log(category)
    },[])

    const RenderCards=()=>{
        const listCard = category.map((c) => 
            <Grid.Col span={3} key={c.id}>
                <Card shadow="sm" padding="lg" radius="md" withBorder size="sm">
                <Card.Section>
                    <Image
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                    />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{c.name}</Text>
                </Group>
                <Text size="sm" color="dimmed">
                    {c.description}
                </Text>
            </Card>
            </Grid.Col>);

        return listCard;
    }
    return(
        <>
        <Grid>
            <RenderCards></RenderCards>
        </Grid>
        </>
    )

}