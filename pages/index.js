import Head from 'next/head';
import { useState } from 'react';
import { Button, Divider, Input } from '@statisticsnorway/ssb-component-library';
import data from './nameSearchPop300';

export default function Home() {
  const nameData = data.response.docs;
  const [result, setResult] = useState("");

  function SearchName(param) {
    let text = "";
    let names = param.split(' ');
    names = names.map(n => n = n.charAt(0).toUpperCase() + n.slice(1).toLowerCase());
    if (names.length > 1) {
      let f = nameData.find(n => n.name === names.join(" ").toUpperCase());
      if (f && f.type === "full") text += `Det er ${f.count > 3 ? f.count : "0-3"} personer som har ${names.join(" ")} som fornavn og etternavn.`;
    }
    names.forEach(e => {
      let i = nameData.filter(n => n.name === e.toUpperCase());
      i.map(x => {
        if (x.type === "firstgiven") text += `Det er ${x.count > 3 ? x.count : "0-3"} personer som har ${e} som fornavn. \n`;
        if (x.type === "onlygiven") text += `Det er ${x.count > 3 ? x.count : "0-3"} personer som bare har ${e} som fornavn. \n`;
        if (x.type === "family") text += `Det er ${x.count > 3 ? x.count : "0-3"} personer som har ${e} som etternavn. \n`;
      })
    });
    if (text == "") text = `Det er 0-3 personer som heter ${names.join(" ")}.`;
    setResult(text);
  }

  return (
    <div>
      <Head>
        <title>Navnesøk</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <Input searchField submitCallback={SearchName} />
        <span>
          <h2>Resultat</h2>
          <Divider light />
          <p>{result}</p>
        </span>
      </main>
    </div>
  )
}
