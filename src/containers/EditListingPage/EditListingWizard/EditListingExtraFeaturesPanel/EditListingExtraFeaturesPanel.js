import React from "react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
// import ListingLink from './ListingLink';
import EditListingExtraFeaturesForm from "./EditListingExtraFeaturesForm";
import { LISTING_STATE_DRAFT } from './constants';
// import CSS from './EditListingAvailabilityPanel.module.css';
// import css from './EditListingAvailabilityPanel.css';

const getInitialValues = (params) => {
    const { listing } = params;
    const { extraFeatures } = listing?.attributes.publicData || {};

    return { extraFeatures };
};

const EditListingExtraFeaturesPanel = (props) => {
    const {
        className,
        rootClassName,
        listing,
        disabled,
        ready,
        onSubmit,
        submitButtonText,
        panelUpdated,
        updateInProgress,
        errors,
    } = props;

    const classes = classNames(rootClassName || CSS.root, className);
    const initialValues = getInitialValues(props);
    const isPublished = listing?.id && listing?.attributes?.state !== LISTING_STATE_DRAFT;
    const unitType = listing?.attributes?.publicData?.unitType;

    return (
        <div className={classes}>
            <H3 as="h1">
                {isPublished ? (
                    <FormattedMessage
                        id="EditListingExtraFeaturesPanel.title"
                        values={{ listingTitle: <ListingLink listing={listing} />, lineBreak: <br /> }}
                    />
                ) : (
                    <FormattedMessage
                        id="EditListingExtraFeaturesPanel.createListingTitle"
                        values={{ lineBreak: <br /> }}
                    />
                )}
            </H3>
            <EditListingExtraFeaturesForm
                className={css.form}
                initialValues={initialValues}
                onSubmit={values => {
                    const { extraFeatures = '' } = values;

                    // New values for listing attributes
                    const updateValues = {
                        publicData: {
                            extraFeatures
                        }
                    };
                    onSubmit(updateValues);
                }}
                unitType={unitType}
                saveActionMsg={submitButtonText}
                disabled={disabled}
                ready={ready}
                updated={panelUpdated}
                updateInProgress={updateInProgress}
                fetchErrors={errors}
            />
        </div>
    );
};

export default EditListingExtraFeaturesPanel;