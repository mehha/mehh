import React from 'react';
import client from "../../utils/fetch/client";

async function Pages({params}) {
    
    // console.log('params', params)
    
    const pages = await client('wp/v2/pages')
    const page = await client('wp/v2/pages?slug='+params?.slug)

    // console.log('pages', pages)
    console.log('page', page)

    return (
        <div>
            {page[0]?.title?.rendered}
            {page[0]?.excerpt?.rendered}
        </div>
    );
}

export default Pages;