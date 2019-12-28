import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import { Text } from 'react-native-ui-kitten';
import colors from '../constants/colors';
import database from '../api/database';
import LoadingStatus from '../components/loading';

function WholePostScreen({ navigation }) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const post = navigation.state.params;
  const title = (post && post.title) || 'Tytuł ogłoszenia';
  const content =
    (post && post.content) ||
    'Mam 32 lata i nie mam ręki do roślin doniczkowych. Za cholerę niemam. Wszystkie po oddaniu pod moją opiekę usychają lub gniją. A ja naprawdę uwielbiam rośliny. Przez lata próbowałam różnych gatunków o różnych wymaganiach, czytałam o specyfice każdego z nich zanim jakiś nabyłam. Trzymałam się wytycznych w przypadku każdej mojej roślinki. Wszystkie padły. Większość z nich z niedostatku wody, a te tropikalne w wyniku zbyt częstego podlewania. Nawet kaktusa uśmierciłam. O ironio. Ok, powiecie, że nie jest to anonimowe, bo mogę o tym powiedzieć znajomym, w końcu to nie żaden wstyd, że urodziłam się takim beznadziejnym ogrodnikiem, ALE... chodzi o to, że ja, żeby bardziej na danego kwiatka się „otworzyć” i uwrażliwić (a w konsekwencji lepiej się nim zajmować) - każdemu z nich nadaję imiona. A w związku z tym, że dostały już imiona i żyły ze mną przez jakiś czas, ciężko jest mi się ich pozbyć po niechybnej śmierci. Tak, „zwłoki” Tymka, Majki, Lusi, Stefcia, Rózi i Bodzia wciąż są ze mną. Było ich więcej, ale mąż się ich pozbył pod moją nieobecność. On się ze mnie strasznie nabija i choć wiem, że ma racje i sama się czasem podśmiewam z tej swoje paranoi, to w głębi serca naprawdę jest mi strasznie smutno za każdym razem kiedy zdycha kolejna roślinka. Właściwie to jestem mu wdzięczna, że kilka z nich po prostu wyrzucił bez uzgodnienia ze mną, bo wiem, że moralność nie pozwoliłaby mi na to pozwolić, a tak w jakimś sensie sumienie mam czyste, bo przecież o niczym nie wiedziałam, prawda? Jestem w połowie ciąży - mam nadzieje, że matką będę lepszą niż ogrodnikiem. Trzymajcie kciuki za mojego syna, żeby pożył dłużej niż jego przyrodnie, zielone rodzeństwo! Ps. Poważnie. Módlcie się za niego.';
  const creation_date =
    (post && post.created_at.toDate().toLocaleDateString('pl-PL', options)) ||
    '';

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = () => {
    const getImages = async () => {
      setImages(await database.getPhotosOfPost(post.uid));
      setIsLoading(false);
    };
    getImages();
  };

  useEffect(fetchImages, []);

  if (isLoading) return <LoadingStatus />;

  return (
    <ScreenContainer noStyle>
      <ScrollView
        style={styles.heightStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textStyle}>
          <View>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.dateStyle}>{creation_date}</Text>
            {images.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.allImagesStyle}>
                {images.map(image => (
                  <Image
                    style={styles.imageStyle}
                    key={image.uid}
                    source={{
                      uri: image.uri,
                    }}
                  />
                ))}
              </ScrollView>
            )}
          </View>
          <View>
            <Text style={styles.contentStyle}>{content}</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    shadowColor: 'grey',
    shadowRadius: 10,
    elevation: 15,
    padding: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  titleStyle: {
    marginTop: 10,
    fontWeight: 'bold',
    color: colors.politechnika,
    fontSize: 21,
  },
  dateStyle: {
    fontWeight: 'bold',
    marginVertical: 7,
    color: colors.labelGrey,
  },
  imageStyle: {
    width: 250,
    height: 150,
    marginRight: 8,
  },
  allImagesStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 10,
  },
  contentStyle: {
    marginBottom: 20,
  },
  heightStyle: {
    height: '100%',
  },
});

export default WholePostScreen;
