'use client'
import { getPropertyPhotos } from '@/api';
import { getPhotoUrl } from '@/app/properties/photos';
import {formatPriceOutPut, formatStatus, formatType } from '@/lib/format';
import { Page, Document, Font } from '@react-pdf/renderer';
import { useEffect, useState } from "react";
import Html from "react-pdf-html";
import handleDownload from './pdfButton';
import { Button } from './ui/button';

export default function CreatePropertyDocument({ ownerData, propertyData}) {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {


        const photoData = await getPropertyPhotos(propertyData.id);
        setPhoto(photoData);
        setLoading(false);
   
    })();
  }, []);

  function CreateDocument() {
    Font.register({
      family: 'Roboto',
      fonts: [
        {
          fontStyle: 'normal',
          fontWeight: 400,
          format: 'ttf',
          src: `https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf`
        }
      ]
    });

    const stylesheet = {
      body: {
        fontFamily: "Roboto"
      }
    };

    const html = `
    <html lang="en">
    <body>
      <style>
        .property-card {
          display: flex;
          flex-direction: column;
        }
        .property-card p {
          margin: 0;
        }
        .property-card .title {
          font-size: 0.875rem;
          font-weight: 500;
        }
        .flex {
          width: 600px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .img {
          width: 300px;
          height: 400px;
        }
          .owner-info{
          margin-top:20px;
          }
           .owner-info p{
           margin:5px 0;
           }
        .owner-info .title {
          font-size: 0.875rem;
          font-weight: 500;
        }
        .col {
          width: 250px;
        }
          .address{
          margin-bottom:20px
          }
        .col div{
        margin:10px 0;
        }
      </style>
      <div class="property-card">
        <img src="${getPhotoUrl(photo)}" alt="" />
        <div class="flex">
          <div class="col">
            <div>
              <p class="title">Тип</p>
              <p>${formatType(property.type)}</p>
            </div>
            <div>
              <p class="title">Статус</p>
              <p>${formatStatus(property.status)}</p>
            </div>
            <div>
              <p class="title">Количество санузлов</p>
              <p>${property.bathrooms}</p>
            </div>
          </div>
          <div class='col'>
            <div>
              <p class="title">Цена</p>
              <p>${formatPriceOutPut(property.price)} руб</p>
            </div>
            <div>
              <p class="title">Количество спальных комнат</p>
              <p>${property.bedrooms}</p>
            </div>
            <div>
              <p class="title">Площадь</p>
              <p>${property.area} м²</p>
            </div>
         
          </div>
        </div>
        <div>
             <div class='address'>
              <p class="title">Адресс</p>
              <p>${property.address} м²</p>
            </div>
          <p class="title">Завершено</p>
          <p>${property.is_finished ? "Да" : "Нет"}</p>
        </div>
      </div>
      <div class="owner-info">
        <p class="title">Информация о владельце</p>
        <p>Имя: ${ownerData.name}</p>
        <p>Email: ${ownerData.email}</p>
        <p>Телефон: ${ownerData.phone_number}</p>
      </div>
    </body>
    </html>`;
if (!loading) {
	return (
      <Document>
        <Page size='A4'>
          <Html stylesheet={stylesheet}>{html}</Html>
        </Page>
      </Document>
    );
}

  }
 
  if (!loading) {
return <Button variant='outline' onClick={()=> handleDownload(CreateDocument)}> Скачать документ</Button>
    
  }
else{
	return <Button variant='outline' > Скачать документ</Button>;

}
}