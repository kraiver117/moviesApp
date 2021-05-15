import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigation/StackNavigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'Detail'> {};

export const Detail = ({ route, navigation }: Props) => {
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const { isLoading, cast, fullMovie } = useMovieDetails(movie.id);

    return (
        <ScrollView>
            <View style={ styles.imageContainer }>
                <View style={ styles.imageBorder }>
                    <Image 
                        source={{ uri }}
                        style={ styles.posterImage }
                    />
                </View>
            </View> 
            <View style={ styles.marginContainer }>
                <Text style={ styles.subtitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>
            {
                isLoading 
                    ? <ActivityIndicator size={ 35 } color="gray" style={{ marginTop: 20 }} />
                    : <MovieDetails fullMovie={ fullMovie! } cast={ cast } />
            }

            {/* Back button */}
            <TouchableOpacity 
                onPress={ () => navigation.pop() }
                style={ styles.backButton }
            >
                <Icon 
                    color="white"
                    name="arrow-back-outline"
                    size={ 40 }
                />
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height: screenHeight * 0.7,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20
    },
    posterImage: {
        flex: 1
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.8,
        color: 'gray'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 20,
        left: 10
    }
});
