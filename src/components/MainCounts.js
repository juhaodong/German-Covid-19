import React, { Component } from 'react'
import { metricText, getDataFromRegion } from '../utils/utils'

export default class MainCounts extends Component {
    render() {
        const { data, currentRegion, date, lang, fullPlot } = this.props
        if (data == null) return <div />

        return (
            <div className="counts-wrap">
                {!fullPlot &&
                    [ 'confirmedCount', 'deadCount', 'curedCount' ].map((metric) => {
                        const count =
                            Object.keys(getDataFromRegion(data, currentRegion)[metric]).length > 0
                                ? getDataFromRegion(data, currentRegion)[metric][date]
                                : '—'
                        return (
                            <div key={`${metric}-number`} className="count-wrap">
                                <div className="count">{count ? count : 0}</div>
                                <div className="count-title">{metricText[metric][lang]}</div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}
