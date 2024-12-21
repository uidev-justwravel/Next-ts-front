import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Avatar,
    Divider,
    Box,
    Stack
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    ip: string;
    address: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country: string;
    };
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company: {
        department: string;
        name: string;
        title: string;
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            country: string;
        };
    };
}

interface UserCardProps {
    user: User;
}

const DetailCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <Card
            style={{
                maxWidth: 400,
                margin: '20px auto',
                borderRadius: '15px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                style={{ borderRadius: '15px 15px 0 0', objectFit: 'cover' }}
            />
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        alt={`${user.firstName} ${user.lastName}`}
                        src={user.image}
                        style={{ width: 80, height: 80, border: '3px solid #3f51b5' }}
                    />
                    <Box>
                        <Typography variant="h6" component="div">
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                        >
                            {user.company.title} @ {user.company.name}
                        </Typography>
                    </Box>
                </Stack>

                <Divider style={{ margin: '15px 0' }} />

                <Box>
                    <Typography
                        variant="body1"
                        component="div"
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                    >
                        <EmailIcon style={{ marginRight: '8px', color: '#3f51b5' }} />
                        {user.email}
                    </Typography>

                    <Typography
                        variant="body1"
                        component="div"
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                    >
                        <PhoneIcon style={{ marginRight: '8px', color: '#3f51b5' }} />
                        {user.phone}
                    </Typography>

                    <Typography
                        variant="body1"
                        component="div"
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                    >
                        <BusinessIcon style={{ marginRight: '8px', color: '#3f51b5' }} />
                        {user.address.city}, {user.address.state}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};


export default DetailCard;
