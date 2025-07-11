'use client'
import * as React from "react"
import { useRouter } from 'next/navigation'
import { SVGProps, Ref, forwardRef, memo } from "react"
interface SVGRProps {
    title?: string;
    titleId?: string;
}
const AuctionLogo = (
    { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>
) => {
    const router = useRouter()

    return <button
        type="button" onClick={() => router.push('/')}
    >

        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={2}
            viewBox="-52 -53 100 100"
            ref={ref}
            aria-labelledby={titleId}
        >
            {title ? <title id={titleId}>{title}</title> : null}
            <g fill="none">
                <ellipse stroke="#66899a" rx={6} ry={44} />
                <ellipse stroke="#e1d85d" rx={6} ry={44} transform="rotate(-66)" />
                <ellipse stroke="#80a3cf" rx={6} ry={44} transform="rotate(66)" />
                <circle r={44} stroke="#4b541f" />
            </g>
            <g fill="#66899a" stroke="#fff">
                <circle r={13} fill="#80a3cf" />
                <circle cy={-44} r={9} />
                <circle cx={-40} cy={18} r={9} />
                <circle cx={40} cy={18} r={9} />
            </g>
        </svg>
    </button>
}
const ForwardRef = forwardRef(AuctionLogo)
const Memo = memo(ForwardRef)
export default Memo
