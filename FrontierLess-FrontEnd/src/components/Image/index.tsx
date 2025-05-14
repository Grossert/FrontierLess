import ImageNext from 'next/image';
import { useState } from 'react';

interface Props {
    src?: string;
}

export default function Image({ src }: Props) {
    const [imgSrc, setImgSrc] = useState(src || '/img/flags/brasil.png');

    const handleError = () => {
        setImgSrc('/img/flags/brasil.png');
    };

    return (
        <div className="relative w-full h-full">
            <ImageNext
                className="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
                src={imgSrc}
                alt=""
                layout="fill"
                onError={handleError}
            />
        </div>
    );
}
