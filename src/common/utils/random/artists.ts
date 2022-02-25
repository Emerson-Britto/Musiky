import faker from 'faker';
import { request } from 'common/utils/request';
import { ArtistDataProps } from 'common/types';

interface FinalRes {
    maxResult: number,
    provider: string,
    resquestId: string,
    artists: ArtistDataProps[]
}

const randomArtists = async({ maxResult=6 }: {maxResult: number}) => {

    const res: FinalRes = {
        maxResult: maxResult,
        provider: 'Musiky API',
        resquestId: faker.datatype.uuid(),
        artists: []
    };

    while (res.artists.length < maxResult) {
        const randomNum: number = ~~(Math.random() * 200);
        let requestRes: ArtistDataProps | {} = await request(
            'artistPerIndex',
            `?index=${randomNum}`
        );
        if (requestRes && !!Object.keys(requestRes).length) {
            res.artists.push(requestRes);
        }
    }

    return res;
}

export default randomArtists;
