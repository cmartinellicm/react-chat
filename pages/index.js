import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

function Title(props) {
    const Tag = props.tag || 'h1';

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {
    const roteamento = useRouter();
    const [username, setUsername] = useState('');
    const [userIsValid, setUserIsValid] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: 'Invalid user',
        location: '',
    });

    useEffect(() => {
        if (username.length > 1) {
            fetch(`https://api.github.com/users/${username}`).then(
                (response) => {
                    if (response.status !== 200) {
                        setUserIsValid(false);

                        setUserDetails({
                            name: 'Invalid user',
                            location: '',
                        });
                    } else {
                        response.json().then((data) => {
                            setUserIsValid(true);

                            setUserDetails({
                                name: data.name,
                                location: data.location,
                            });
                        });
                    }
                }
            );
        } else {
            setUserIsValid(false);
        }
    }, [username]);

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[600],
                    backgroundImage: `url(${appConfig.theme.backgroundImageURL})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%',
                        maxWidth: '700px',
                        borderRadius: '5px',
                        padding: '32px',
                        margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as='form'
                        onSubmit={(event) => {
                            event.preventDefault();
                            roteamento.push(`/chat?username=${username}`);
                        }}
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' },
                            textAlign: 'center',
                            marginBottom: '32px',
                        }}
                    >
                        <Title tag='h2'>
                            Chat with the developer community!
                        </Title>
                        <Text
                            variant='body3'
                            styleSheet={{
                                marginBottom: '32px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                        >
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            placeholder='Insert your GitHub user name...'
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor:
                                        appConfig.theme.colors.neutrals[200],
                                    mainColor:
                                        appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight:
                                        appConfig.theme.colors.primary[500],
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Login'
                            fullWidth
                            buttonColors={{
                                contrastColor:
                                    appConfig.theme.colors.neutrals['000'],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight:
                                    appConfig.theme.colors.primary[400],
                                mainColorStrong:
                                    appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor:
                                appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        {userIsValid && (
                            <Image
                                styleSheet={{
                                    borderRadius: '50%',
                                    marginBottom: '16px',
                                }}
                                src={
                                    userIsValid &&
                                    `https://github.com/${username}.png`
                                }
                            />
                        )}

                        <Text
                            variant='body4'
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor:
                                    appConfig.theme.colors.primary[900],
                                padding: '3px 10px',
                                marginBottom: '5px',
                                borderRadius: '1000px',
                            }}
                        >
                            {userDetails.name}
                        </Text>

                        {userDetails.location && (
                            <Text
                                variant='body4'
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor:
                                        appConfig.theme.colors.primary[900],
                                    padding: '3px 10px',
                                    borderRadius: '1000px',
                                }}
                            >
                                {userDetails.location}
                            </Text>
                        )}
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
