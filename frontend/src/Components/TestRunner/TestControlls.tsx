import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { ButtonSuccess, SmallButton } from '../Common/Button';

type SelectedCategories = {
    performance: boolean,
    accessibility: boolean,
    "best-practices": boolean,
    seo: boolean,
    pwa: boolean
};

type Cookie = {
    name: string,
    value: string
};

const FlexRowDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
`;

const CategoriesContainer = styled(FlexRowDiv)`
    justify-content: space-between;
    margin-right: 10%
`;

const MobileControllRow = styled(FlexRowDiv)`
    width: 50%;
`;

const MobileNetworkRow = styled(MobileControllRow)`
    justify-content: space-between;
`;

const NetworkSelect = styled.select`
    width: 25%;
`;

const CookiesContaier = styled(FlexRowDiv)`
    align-items: flex-start;
    justify-content: space-between;
`;

const CreateCookieContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`;

const CookieInputRow = styled(FlexRowDiv)`
    justify-content: space-between;
`;

const SetCookiesContainer = styled.div`
    width: 60%;
`;

const SetCookieRow = styled(FlexRowDiv)`
    justify-content: space-between;
`

const SetCookieText = styled.p`
    word-wrap: break-word;
    width: 70%;
    margin: 2px 0;
`;

const SetCookieName = styled.span`
    font-weight: bold;
`;

export default ({disabled}: {disabled: boolean}) => {

    const [selectedCategories, setSelectedCategories] = useState<SelectedCategories>({
        performance: true,
        accessibility: true,
        "best-practices": true,
        seo: true,
        pwa: true
    });
    const [mobile, setMobile] = useState(false);
    const [networkSpeed, setNetworkSpeed] = useState('none');
    const [editedCookie, setEditedCookie] = useState<Cookie>({
        name: '',
        value: ''
    });
    const [cookies, setCookies] = useState<Cookie[]>([]);


    const changeSelectedCategory = (category: keyof SelectedCategories) => {
        const newSelectedCategories = {...selectedCategories};
        newSelectedCategories[category] = !selectedCategories[category];
        setSelectedCategories(newSelectedCategories);
    }

    const changeCookie = (newText: string, key: keyof Cookie) => {
        const newCookie = {...editedCookie};
        newCookie[key] = newText;
        setEditedCookie(newCookie);
    }

    const addCookie = () => {
        const currentCookies = [...cookies];
        const editedCookieInCurrentCookies = currentCookies.findIndex((val) => val.name === editedCookie.name);
        if (editedCookieInCurrentCookies === -1) {
            currentCookies.push({...editedCookie});
        } else {
            currentCookies[editedCookieInCurrentCookies].value = editedCookie.value;
        }
        setEditedCookie({
            name: '',
            value: ''
        });
        setCookies(currentCookies);
    }

    const removeCookie = (idx: number) => {
        const currentCookies = [...cookies];
        currentCookies.splice(idx, 1);
        setCookies(currentCookies);
    }

    useEffect(() => {
        if (!mobile) {
            setNetworkSpeed('none');
        }
    }, [mobile]);

    return (
        <>
            <CategoriesContainer>
                <h3> Categories </h3>
                <div>
                    <input type="checkbox"
                        disabled={disabled}
                        name="performance"
                        id="performance-checkbox"
                        checked={selectedCategories.performance}
                        onChange={() => {changeSelectedCategory("performance")}} />
                    <label htmlFor="performance-checkbox">Performance</label>
                </div>
                <div>
                    <input type="checkbox"
                        disabled={disabled}
                        name="accessibility"
                        id="accessibility-checkbox"
                        checked={selectedCategories.accessibility}
                        onChange={() => {changeSelectedCategory("accessibility")}} />
                    <label htmlFor="accessibility-checkbox">Accessibility</label>
                </div>
                <div>
                    <input type="checkbox"
                        disabled={disabled}
                        name="best-practices"
                        id="best-practices-checkbox"
                        checked={selectedCategories["best-practices"]}
                        onChange={() => {changeSelectedCategory("best-practices")}} />
                    <label htmlFor="best-practices-checkbox">Best practices</label>
                </div>
                <div>
                    <input type="checkbox"
                        disabled={disabled}
                        name="seo"
                        id="seo-checkbox"
                        checked={selectedCategories.seo}
                        onChange={() => {changeSelectedCategory("seo")}} />
                    <label htmlFor="seo-checkbox">SEO</label>
                </div>
                <div>
                    <input type="checkbox"
                        disabled={disabled}
                        name="pwa"
                        id="pwa-checkbox"
                        checked={selectedCategories.pwa}
                        onChange={() => {changeSelectedCategory("pwa")}} />
                    <label htmlFor="pwa-checkbox">PWA</label>
                </div>
            </CategoriesContainer>
            <CategoriesContainer>
                <MobileControllRow>
                    <input type="checkbox"
                    disabled={disabled}
                    name="mobile"
                    id="mobile-checkbox"
                    checked={mobile}
                    onChange={() => {setMobile(!mobile)}} />
                    <label htmlFor="mobile-checkbox"> <h3>Emulate mobile</h3></label>
                </MobileControllRow>
                <MobileNetworkRow>
                    <label htmlFor="networkSpeedSelector"> <h3> Mobile Network Speed </h3> </label>
                    <NetworkSelect
                    disabled={!mobile || disabled}
                    name="networkSpeed"
                    id="networkSpeedSelector"
                    value={networkSpeed}
                    onChange={(event) => {setNetworkSpeed(event.target.value)}} >
                        <option value="none">Default</option>
                        <option value="2g">2G</option>
                        <option value="3g">3G</option>
                        <option value="4g">4G</option>
                    </NetworkSelect>
                </MobileNetworkRow>
            </CategoriesContainer>
            <CookiesContaier>
                <CreateCookieContainer>
                    <CookieInputRow>
                        <label htmlFor="cookie-name-input">
                            <h3>Name</h3>
                        </label>
                        <input type="text"
                            value={editedCookie.name}
                            id="cookie-name-input"
                            name="cookie-name"
                            onChange={event => changeCookie(event.target.value, "name")} />
                    </CookieInputRow>
                    <CookieInputRow>
                        <label htmlFor="cookie-value-input">
                            <h3>Value</h3>
                        </label>
                        <input type="text"
                            value={editedCookie.value}
                            id="cookie-value-input"
                            name="cookie-value"
                            onChange={event => changeCookie(event.target.value, "value")} />
                    </CookieInputRow>
                    <ButtonSuccess title="Add cookies" onClick={addCookie} />
                </CreateCookieContainer>
                <SetCookiesContainer>
                    {cookies.map((cookie, idx) => {
                        return (
                            <SetCookieRow key={cookie.name}>
                                <SetCookieText>
                                    <SetCookieName>{cookie.name}</SetCookieName>:
                                    <span> {cookie.value} </span>
                                </SetCookieText>
                                <SmallButton
                                    title="Remove cookie"
                                    style={{'backgroundColor': '#de4463'}}
                                    onClick={() => removeCookie(idx) }
                                />
                            </SetCookieRow>
                        )
                    })}
                </SetCookiesContainer>
            </CookiesContaier>
        </>
    )
}