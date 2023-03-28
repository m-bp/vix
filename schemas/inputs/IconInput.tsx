import { SearchIcon } from "@sanity/icons"
import { Autocomplete, AutocompleteProps, Box, Flex, Stack } from "@sanity/ui"
import Image from "next/image"
import { memo, useCallback } from "react"
import { set, StringInputProps, unset } from "sanity"

import iconList from "../iconList.json"

const options = iconList.map(value => ({ value }))

// eslint-disable-next-line react/display-name
const Icon = memo(({ name }: { name: string }) => {
  return (
    <Box
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#333",
        borderRadius: "5px",
        width: 30,
        height: 30,
      }}>
      {name && (
        <Image
          alt=""
          width={25}
          height={25}
          src={`/icons/${name}.svg`}
          style={{ filter: "invert(1)" }}
        />
      )}
    </Box>
  )
})

const renderOption: AutocompleteProps<{ value: string }>["renderOption"] = ({
  value,
}) => (
  <Flex justify="space-between" align="center" paddingX={2}>
    <Box display="inline-block" paddingY={2}>
      {value}
    </Box>
    <Icon name={value} />
  </Flex>
)

function IconInput({ onChange, value = "", elementProps }: StringInputProps) {
  const handleChange: AutocompleteProps<{ value: string }>["onChange"] =
    useCallback(inputValue => !inputValue && onChange(unset()), [onChange])

  const handleSelect: AutocompleteProps<{ value: string }>["onSelect"] =
    useCallback(
      inputValue => {
        const isValid = inputValue && iconList.includes(inputValue)
        onChange(isValid ? set(inputValue) : unset())
      },
      [onChange]
    )

  return (
    <Stack>
      <Box
        paddingY={2}
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "1fr auto 0",
          alignItems: "center",
        }}>
        <Autocomplete
          {...elementProps}
          openButton
          value={value}
          onChange={handleChange}
          onSelect={handleSelect}
          radius={0}
          fontSize={[2, 2, 3]}
          icon={SearchIcon}
          options={options}
          placeholder="Search icons"
          renderOption={renderOption}
        />
        <Icon name={value} />
      </Box>
      <Box>
        <p>
          You can explore all available icons{" "}
          <a
            target="_blank"
            href="https://mui.com/material-ui/material-icons/"
            style={{ textDecoration: "underline" }}>
            here
          </a>
        </p>
      </Box>
    </Stack>
  )
}

export default IconInput
