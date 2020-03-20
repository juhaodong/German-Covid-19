import React, { Component, Fragment } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { FiMap } from 'react-icons/fi'
import { metricText } from '../utils/utils'
import { mapText } from '../utils/map_text'
import * as str from '../utils/strings'
import { plotTypes } from '../utils/plot_types'

export default class MapNavBar extends Component {
    state = {
        dropdownOpen: false
    }

    mapToggle = (event) => {
        const map = event.target.getAttribute('value')
        if (map !== this.props.currentMap) {
            this.props.mapToggle(map)
            if (map === str.CHINA_MAP1 || map === str.CHINA_MAP2) {
                if (this.props.currentMap !== str.CHINA_MAP1 && this.props.currentMap !== str.CHINA_MAP2)
                    this.props.regionToggle([ str.CHINA_ZH ], false)
            } else if (map !== str.TRANSMISSION) {
                this.props.regionToggle([ mapText[map].regionName ], false)
            }
        }
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    metricToggle = (event) => {
        const newMetric = event.target.getAttribute('value')
        if (newMetric !== this.props.metric) this.props.metricToggle(newMetric)
    }

    render() {
        const { lang, metric, currentMap, fullPlot, plotType } = this.props
        return (
            <div className={`map-nav-bar-wrap ${fullPlot && !plotTypes[plotType].metricChange ? 'grey-out' : ''}`}>
                <ul className="map-nav-bar">
                    {[ 'confirmedCount', 'deadCount', 'curedCount' ].map((count) => (
                        <li key={`map-nav-${count}`} className={count === metric ? 'current' : ''}>
                            <div value={count} onClick={this.metricToggle}>
                                {metricText[count][lang]}
                            </div>
                        </li>
                    ))}
                </ul>

                {!fullPlot && (
                    <UncontrolledDropdown className="map-toggle">
                        <DropdownToggle
                            className="map-toggle-button"
                            tag="span"
                            data-toggle="dropdown"
                            aria-expanded={this.state.dropdownOpen}
                        >
                            <FiMap size={14} style={{ marginRight: 10 }} />
                            <span>{mapText[currentMap].title[lang]}</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(mapText).map((map, idx) => {
                                return (
                                    <Fragment key={`map-${idx}`}>
                                        {map === str.WORLD_MAP ? <DropdownItem divider /> : <div />}
                                        <DropdownItem
                                            value={map}
                                            className={currentMap === map ? 'current' : ''}
                                            onClick={this.mapToggle}
                                        >
                                            {mapText[map].title[lang]}
                                        </DropdownItem>
                                    </Fragment>
                                )
                            })}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )}
            </div>
        )
    }
}
