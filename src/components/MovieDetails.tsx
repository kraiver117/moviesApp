import React from 'react';
import { FlatList, Text, View } from 'react-native';
import currencyFormatter from 'currency-formatter';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/creditsInterface';
import { FullMovie } from '../interfaces/movieInterface';
import { CastItem } from './CastItem';

interface Props {
    fullMovie: FullMovie;
    cast: Cast[];
}

export const MovieDetails = ({ fullMovie, cast }: Props) => {
    return (
        <>
            {/* Details */}
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name="star-outline"
                        color="gray" 
                        size={ 16 }
                    />
                    <Text style={{ marginHorizontal: 5}}>{ fullMovie.vote_average }</Text>
                    <Text>
                        - { fullMovie.genres.map( genre => genre.name ).join(', ') }
                    </Text>
                </View>

                {/* History */}
                <Text style={{ fontSize:20, marginTop: 10, fontWeight: 'bold' }}>
                    Overview
                </Text>
                <Text style={{ fontSize: 16 }}>
                    { fullMovie.overview }
                </Text>

                {/* Budget */}
                <Text style={{ fontSize:20, marginTop: 10, fontWeight: 'bold' }}>
                    Budget
                </Text>
                <Text style={{ fontSize: 18 }}>
                    { currencyFormatter.format(fullMovie.budget, { code: 'USD' }) }
                </Text>
            </View>
            {/* Casting */}
            <View style={{ marginTop: 10, marginBottom: 20 }}>
                <Text style={{ fontSize:20, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Actors
                </Text>
                <FlatList 
                    data= { cast }
                    keyExtractor={ (item) => item.id.toString() }
                    renderItem={ ({ item }) => <CastItem actor={ item } />}
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    style={{ marginTop: 10, height: 90 }}
                />
            </View>
        </>
    )
}
