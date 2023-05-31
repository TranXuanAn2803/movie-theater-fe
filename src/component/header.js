import { createStyles, Header, Group, Burger, Container, rem } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
        display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
        display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: rem(5),
    },
    }));

export function HeaderMenu() {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
    const links=[{label:'movie', link:'http://localhost:3000/movie'}, {label: 'category', link:'http://localhost:3000/category'}]
    const items = links.map((link) => {
        return (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
        );
    });

    return (
        <Header height={56} mb={20}>
        <Container>
            <div className={classes.inner}>
            <MantineLogo size={28} />
            <Group spacing={5} className={classes.links}>
                {items}
            </Group>
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
            </div>
        </Container>
        </Header>
    );
}