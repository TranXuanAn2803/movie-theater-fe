import { QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect, useContext } from "react";
import { HeaderMenu } from "../../component/header";
import { Card, Image, Text, Badge, Button, Group, Modal, Grid, TextInput, Box } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { fetchMovie, createMovie, updateMovie, deleteMovie } from "../../api/index";

const queryClient = new QueryClient();
export function ListMovie() {
    return (
        <QueryClientProvider client={queryClient}>
        <MoviePage />
        </QueryClientProvider>
    );
}

function MoviePage(){
    const [openCreate, setOpenCreate]= React.useState(false);
    const [openUpdate, setOpenUpdate]= React.useState(false);

    const [id, setId]=React.useState(null);
    const [movie, setMovie]=React.useState([{
                id: 1,
                name: "The Dark Knight",
                description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                director: "Christopher Nolan",
                posterUrl: null,
                vote: 0,
                categories: [
                    {
                        id: 1,
                        name: "Action",
                        description: null
                    },
                    {
                        id: 2,
                        name: "Crime",
                        description: null
                    },
                    {
                        id: 3,
                        name: "Drama",
                        description: null
                    }
                ]
            },
            {
                id: 2,
                name: "The Silence of the Lambs",
                description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
                director: "Jonathan Demme",
                posterUrl: null,
                vote: 0,
                categories: [
                    {
                        id: 1,
                        name: "Action",
                        description: null
                    },
                    {
                        id: 2,
                        name: "Crime",
                        description: null
                    },
                    {
                        id: 4,
                        name: "Thriller",
                        description: null
                    }
                ]}]);
    const handleOpenCreate = ()=>{
        setOpenCreate(true);
    }
    const handleCloseCreate =()=>{
        setOpenCreate(false);
    }
    const handleOpenUpdate = (movieId, description, director)=>{
        setId(movieId);
        FormUpdate.setFieldValue('description', description);
        FormUpdate.setFieldValue('director', director);

        setOpenUpdate(true);
    }
    const handleCloseUpdate =()=>{
        setOpenUpdate(false);
    }
    const FormUpdate = useForm({
    initialValues: { description: '', director: '' },
    // functions will be used to validate values at corresponding key
    validate: {
        description: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        director: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),

    },
    });
    const FormCreate = useForm({
    initialValues: { name:'', description: '', director: '' },
    // functions will be used to validate values at corresponding key
    validate: {
        name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        description: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        director: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),

    },
    });

    const reloadMovie = async()=>{
        console.log('reloadMovie')
        const data = await fetchMovie();
        setMovie(data)
    }
    useEffect(()=>{
        document.title = "Movie";
        reloadMovie();
        console.log(movie)

    },[])

    const handleUpdateMovie =async(value)=>{
        const data= await updateMovie(id, value.description, value.director);
        if (data.status != 200) {
            console.log(data.data);
            handleCloseUpdate();
            return;
        }
        handleCloseUpdate();
        reloadMovie();
    }
    const handleCreateMovie =async(value)=>{
        const data= await createMovie(value.name, value.description, value.director);
        if (data.status != 200) {
            console.log(data.data);
            handleCloseCreate();
            return;
        }
        handleCloseCreate();
        reloadMovie();

    }
    const handleDeleteMovie =async(movieId)=>{
        console.log("movie id", movieId)
        const data= await deleteMovie(movieId);
        console.log(data);
        reloadMovie();
    }
    const RenderCards=()=>{
        const listCard = movie.map((m) => 
            <Grid.Col span={3} key={m.id}>
                <Card shadow="sm" padding="lg" radius="md" withBorder size="sm">
                <Card.Section>
                    <Image
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                    />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{m.name}</Text>
                    {m.categories.map(c=>{
                        <Badge color="pink" variant="light" key={c.id}>c.name</Badge>
                    })}
                </Group>
                <Text size="sm" color="dimmed">
                    {m.description}
                </Text>
                <Button variant="light" color="blue" mt="md" radius="md" onClick={()=>{handleOpenUpdate(m.id, m.description, m.director)}}>
                    Update
                </Button>
                <Button variant="light" color="blue" mt="md" radius="md" onClick={()=>{handleDeleteMovie(m.id)}} >
                    Delete
                </Button>
            </Card>
            </Grid.Col>);

        return listCard;
    }
    return(
        <>
            <Box maw={320} mx="auto">
                <Button variant="light" loaderPosition="right" color="blue" mt="md" radius="md" onClick={()=>{handleOpenCreate()}} >
                    Create New Movie
                </Button>
            </Box>
            <br/>
        <Grid>
            <RenderCards></RenderCards>
        </Grid>
        <Modal opened={openUpdate} onClose={()=>{handleCloseUpdate()}} title="Update Movie" centered>
            <Box maw={320} mx="auto">
            <form onSubmit={FormUpdate.onSubmit(handleUpdateMovie)}>
                <TextInput mt="sm" label="Description" placeholder="Description" {...FormUpdate.getInputProps('description')} />
                <TextInput mt="sm" label="Director" placeholder="Director" {...FormUpdate.getInputProps('director')} />
                <Button type="submit" mt="sm">
                Submit
                </Button>
            </form>
            </Box>
        </Modal>
        <Modal opened={openCreate} onClose={()=>{handleCloseCreate()}} title="Create Movie" centered>
            <Box maw={320} mx="auto">
            <form onSubmit={FormCreate.onSubmit(handleCreateMovie)}>
                <TextInput mt="sm" label="Name" placeholder="Name" {...FormCreate.getInputProps('name')} />
                <TextInput mt="sm" label="Description" placeholder="Description" {...FormCreate.getInputProps('description')} />
                <TextInput mt="sm" label="Director" placeholder="Director" {...FormCreate.getInputProps('director')} />
                <Button type="submit" mt="sm">
                Submit
                </Button>
            </form>
            </Box>
        </Modal>

        </>
    )

}