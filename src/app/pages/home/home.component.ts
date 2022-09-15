import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  titleMusic = '';
  artist: string = '';
  music: string = '';
  lyricMusic: string = '';
  translatedMusic: string = '';
  artistMusic: string = '';

  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  findLyrics(){
    this.homeService.getMusic(this.artist, this.music).subscribe(
      (result: any) => {
        if(result.type == 'notfound' || result.type == 'song_notfound'){
          this.titleMusic = 'não foi possível encontrar nenhum resultado'
        } else {
          console.log('Sucesso',result)
          this.lyricMusic = result.mus[0].text;
          this.artistMusic = result.art.name
          this.titleMusic = result.mus[0].name
        }


        if(result.mus[0].translate){
          this.translatedMusic = result.mus[0].translate[0].text;
        }


      },
      (error: any) => {
        alert('Não foi possível encontrar nenhum resultado')
      },
    )
  }

}
